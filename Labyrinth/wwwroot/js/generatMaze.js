function genMaze(cols, rows){
    const map = [] //labirynth

    //fill labirynth
    for(let y = 0; y < rows; y++){
        const row = Array(cols).fill('wall')
        map.push(row)
    }

    const startX = getRandomFrom(Array(cols).fill(0).map((_item, index) => index).filter(x => x % 2 === 0))
    const startY = getRandomFrom(Array(rows).fill(0).map((_item, index) => index).filter(x => x % 2 === 0))

    var tractor = {}

    tractor.x = startX
    tractor.y = startY

    setField(startX, startY, 'start')

    while(!isMaze())
        moveTractor()
    
    setField(tractor.x, tractor.y, 'finish')

    return map

    function getRandomFrom(array) {
        return array[Math.floor(Math.random() * array.length)]
    }

    function getField (x, y) {
        if (!(x < 0 || x >= cols || y < 0 || y >= rows))
            return map[y][x]
    }

    function setField (x, y, value) {
        if (!(x < 0 || x >= cols || y < 0 || y >= rows))
        map[y][x] = value
    }

    function isMaze () {
        for (let x = 0; x < cols; x++)
            for (let y = 0; y < rows; y++)
                if (x % 2 === 0 && y % 2 === 0 && getField(x, y) === 'wall')
                    return false
        return true
    }

    function moveTractor () {
        const directs = []

        if (tractor.x > 0)
            directs.push('left')

        if (tractor.x < cols - 2)
            directs.push('right')

        if (tractor.y > 0)
            directs.push('up')

        if (tractor.y < rows - 2)
            directs.push('down')

        const direct = getRandomFrom(directs);
        
        switch (direct) {
            case 'left':
                if (getField(tractor.x - 2, tractor.y) === 'wall') {
                    setField(tractor.x - 1, tractor.y, ' ')
                    setField(tractor.x - 2, tractor.y, ' ')
                }
                tractor.x -= 2;
                break;
            case 'right':
                if (getField(tractor.x + 2, tractor.y) === 'wall') {
                    setField(tractor.x + 1, tractor.y, ' ');
                    setField(tractor.x + 2, tractor.y, ' ');
                }
                tractor.x += 2;
                break;
            case 'up':
                if (getField(tractor.x, tractor.y - 2) === 'wall') {
                    setField(tractor.x, tractor.y - 1, ' ');
                    setField(tractor.x, tractor.y - 2, ' ');
                }
                tractor.y -= 2
                break;
            case 'down':
                if (getField(tractor.x, tractor.y + 2) === 'wall') {
                    setField(tractor.x, tractor.y + 1, ' ');
                    setField(tractor.x, tractor.y + 2, ' ');
                }
                tractor.y += 2;
                break;
        }
    }    
}