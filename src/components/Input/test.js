function getCompressedString(text) {
  const a = text.split(' ');

  const is = a.forEach((item) => {
    let count = 0;

    if (item in a) {
      count += 1;
    }

    console.log(count);
  });

  console.log(is);
}

getCompressedString('Hello my name is Vitaliy! And what is your name?');
