function print_row(row){
    if(!row){
        return -1;
    }

    let row_out =   "## ";
    for(let i in row){
        row_out += row[i];
        row_out  += ' ';
    }
    row_out  += '##';

    console.log(row_out);
}

function print_border(){
    let border  = "#".repeat(13);
    console.log(border);
}

function print_board(board){
    if(!board){
        return -1;
    }

    print_border();
    print_border();
}


let row = [1,2,3,4];
print_row(row);


module.exports = {
    print_row,
    print_border,
    print_board
};