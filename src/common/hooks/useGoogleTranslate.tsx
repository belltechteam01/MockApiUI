import { useEffect, useState } from 'react';

const useGoogleTranslate = (text: string, target: string): string => {
  // const { Translate } = v2
  // const translate = new Translate()
  const [translatedText, setTranslatedText] = useState<string>('');

  const translateText = async (_text: string, _target: string): Promise<void> => {
    let url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    url += `&q=${encodeURI(_text)}`;
    url += `&target=${_target}`;

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });

      const response = await res.json();
      const { translations } = response.data;

      setTranslatedText(
        translations.map((translation: any) => translation.translatedText).toString()
      );
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };

  useEffect(() => {
    translateText(text, target);
  }, [text, target]);

  return translatedText;
};

export default useGoogleTranslate;
