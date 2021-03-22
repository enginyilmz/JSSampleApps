var seats = document.querySelectorAll('div.row > div.seat:not(.reserved)');
var films = document.querySelector('select#movie');
const count = document.querySelector('span#count');
const amount = document.querySelector('span#amount');

getFromLocalStorage();
calculate();

seats.forEach(function (seat) {
    seat.addEventListener('click', selectSeat)
});

films.addEventListener('change', function (e) {
    calculate();
});

function selectSeat(e) {
    e.target.classList.toggle('selected');
    calculate();
    e.preventDefault();
}

function calculate() {
    const selectedSeats = document.querySelectorAll('div.row > div.seat.selected')

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat)
    });

    let totalSeatCount = selectedSeats.length;
    count.innerHTML = totalSeatCount;
    amount.innerHTML = totalSeatCount * films.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', films.selectedIndex);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
    if (selectedMovieIndex != null) {
        films.selectedIndex = selectedMovieIndex;
    }
}



