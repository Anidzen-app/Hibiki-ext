import en from './locales/en-US.json';
import hy from './locales/hy-AM.json';
import ja from './locales/ja-JP.json';
import ru from './locales/ru-RU.json';

export default defineI18nConfig(() => ({
    messages: {
        en,
        hy,
        ja,
        ru,
    },
}));