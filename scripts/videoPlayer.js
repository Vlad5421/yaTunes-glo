export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');

    //функция смены иконки плэй на паузу и обратно
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }
    }

    // функция запуска и паузы видео
    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }

    // функция добавляет 0 в начало числа, если оно меньше 10
    const addZero = n => n < 10 ? '0'+n : n;

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    // Перемещение прогресса с течением видео
    videoPlayer.addEventListener('timeupdate', () => {

        const currentTime = videoPlayer.currentTime;
        const durationTime = videoPlayer.duration;
        
        const minutePassed = Math.floor(currentTime / 60);
        const secondPassed = Math.floor(currentTime % 60);

        const minuteDuration = Math.floor(durationTime / 60);
        const secondDuration = Math.floor(durationTime % 60);

        // Тут написал с шаблонной строкой, как в уроке
        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`;
        // Тут оставил стандартно, что бы понимать как шаблонная строка работает
        videoTimeTotal.textContent = addZero(minuteDuration) + ':' + addZero(secondDuration);
        // Переводим currentTime в проценты от durationTme
        videoProgress.value = (currentTime / durationTime) * 100;
    })

    // Изменение currentTime кликом по прогресс-бару
    videoProgress.addEventListener('change', () => {

        const durationTime = videoPlayer.duration;
        // Переводим value (в процентах) в currentTime (число)
        videoPlayer.currentTime = (videoProgress.value * durationTime) / 100;

    });

    //Функция остановки идео по клику на кнопку СТОП
    videoButtonStop.addEventListener('click', () => {

        videoPlayer.pause();
        videoPlayer.currentTime = 0;

    })
};
