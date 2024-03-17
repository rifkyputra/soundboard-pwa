const synth = window.speechSynthesis;

interface speakParams {
  text: string;
  speechRate: number;
}

export const speak = (props: speakParams) => {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = props.text;
  utterance.lang = 'id-ID';
  utterance.rate = props.speechRate;
  synth.speak(utterance);
};

const textToSpeech = () => {
  return {
    speak: speak,
    pause: () => synth.pause(),
    resume: () => synth.resume(),
    cancel: () => synth.cancel(),
  };
};

export default textToSpeech;
