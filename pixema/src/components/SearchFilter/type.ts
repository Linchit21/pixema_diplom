export interface ISearchFilterFormValues {
  order: 'RATING' | 'YEAR'; // Значение для сортировки
  keyword: string; // Ключевое слово для поиска
  genres: string; // id жанра
  countries: string; // id страны
  yearFrom: number; // Год начала
  yearTo: number; // Год конца
  ratingFrom: number; // Рейтинг от
  ratingTo: number; // Рейтинг до
}
