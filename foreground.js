var query = '';

const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.start();

recognition.lang = 'en-US';

recognition.continuous = true;

recognition.addEventListener("result", (event) => {
    const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

    if (transcript.toLowerCase().includes('max')) {
        query = transcript.replace(/Max/g, '');
        recognition.stop();
        recognition.start();
    }
});

recognition.addEventListener("end", () => {
    document.getElementsByClassName('m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0')[0].value = query;
    document.getElementsByClassName('absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent')[0].click();
    query = '';
    recognition.start();
});


recognition.addEventListener("error", (event) => {
    console.error("Error occured in recognition ", event.error);
});


