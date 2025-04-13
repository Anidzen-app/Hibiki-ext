chrome.alarms.create('checkAnimeUpdates', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkAnimeUpdates') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Новая серия!',
            message: 'Вышла новая серия твоего любимого онгоинга 🍿'
        });
    }
});
