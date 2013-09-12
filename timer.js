function Countdown(seconds, display) {
    var ticksLeft = seconds,
        self = this, ticker;

    self.active = true;
    
    function getMins() {
        return Math.floor(ticksLeft / 60);
    }
    function getSecs() {
        return (ticksLeft < 60) ? ticksLeft : ((ticksLeft % 60 === 0) ? 0 : (Math.round(((ticksLeft / 60) - Math.floor(ticksLeft / 60)) * 60)));
    }
    function setOff() {
        self.ticker = setInterval(update, 1000);
    }
    this.render = function() {
        var minutes = getMins(),
            seconds = getSecs();
        display.html(('Timer: ' + minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds)));
    };
    function update() {
        if (ticksLeft >= 0) {
            self.render();
            ticksLeft -= 1;
        } else {
            self.active = false;
            clearInterval(ticker);
        }
    }
    this.fire = function () {
        setOff();
    };
}