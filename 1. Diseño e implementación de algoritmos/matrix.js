const convertMatrix=(matrix)=>{
    let goRight = true;
    let goDown = false;
    let goLeft = false;
    let indexX = 0;
    let indexY = -1;
    
    let columns = matrix[0].length;
    let rows = matrix.length;
    //get the total number of elements to iterate
    let numberIterations = columns * rows;

    let responseArray = [];
    let indexGetted=[];

    for(let i=1; i <= numberIterations; i++){
        if(goLeft){
            indexY --;
            if( indexY == -1 ) {
                indexY = 0; indexX --;
                goLeft = false;
            } 
            else if(indexGetted.find(a=> a.x==indexX && a.y==indexY) !=  undefined) {
                indexY ++; indexX --;
                goLeft = false;
            }
        }else if (goRight){
            indexY ++;
            if( indexY == ( columns ) ) {
                indexY = columns - 1; indexX ++;
                goRight = false;
                goDown = true;
            }else if( indexGetted.find(a=> a.x==indexX && a.y==indexY) !=  undefined ) {
                indexY --; indexX ++;
                goRight = false;
                goDown = true;
              }
        }else if (goDown){
            indexX ++;
            if( indexX == (rows) ) {
                indexX = rows - 1; indexY --;
                goDown = false;
                goLeft = true;
            } 
            else if(indexGetted.find(a=> a.x==indexX && a.y==indexY) !=  undefined) {
                indexY --; indexX --;
                goDown = false;
                goLeft = true;
            }
        }else{//goUp
            indexX --;
            if( indexX == -1 || indexGetted.find(a=> a.x==indexX && a.y==indexY) !=  undefined) {
                indexX ++; indexY ++;
                goRight = true;
            }
        }
        //inserting value in response
        responseArray.push(matrix[indexX][indexY]);

        //inserting reviewed point(x,y)
        indexGetted.push({
            x:indexX,
            y:indexY
        });
    }

    const responseData = {
        data : responseArray.join(", ")
    };

    return responseData;
};

exports.caracol = convertMatrix;