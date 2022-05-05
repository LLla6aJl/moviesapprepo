export function truncate(numberSymbols, useWordBoundary) {
  if (this.length <= numberSymbols) {
    return this;
  }
  const subString = this.substring(0, numberSymbols - 1);
  return `${
    useWordBoundary
      ? subString.substring(0, subString.lastIndexOf(' '))
      : subString
  }...`;
}

export function Circle(voteAverage) {
  let classNameCircle = '';
  switch (true) {
    case voteAverage <= 3:
      classNameCircle = 'circleRate';
      break;
    case voteAverage > 3 && voteAverage <= 5:
      classNameCircle = 'circleRate E97E00';
      break;
    case voteAverage > 5 && voteAverage <= 7:
      classNameCircle = 'circleRate E9D100';
      break;
    case voteAverage > 7:
      classNameCircle = 'circleRate C66E900';
      break;
    default:
      classNameCircle = 'circleRate';
  }
  return classNameCircle;
}

// eslint-disable-next-line camelcase
export function Genres(genresList, genreIds) {
  // eslint-disable-next-line prefer-arrow-callback
  let genres = genresList.filter(function gen(v) {
    // eslint-disable-next-line prefer-arrow-callback
    return genreIds.some(function gen2(v2) {
      return v.id === v2;
    });
  });
  genres = genres.map((element) => element.name);
  const genresItems = genres.map((genr) => (
    <span className="genr" key={genr}>
      {genr}
    </span>
  ));

  return genresItems;
}
