const showFormattedDate = (date) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  let monthName = months[date.getMonth()];

  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  let dayName = days[date.getDay()];
  return `${dayName}, ${date.getDate()} ${monthName} ${date.getFullYear()}`;
};

export { showFormattedDate };
// const options = {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };
// return new Date(date).toLocaleDateString("id-ID", options);
