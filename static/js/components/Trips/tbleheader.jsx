function TableHeader({col2, col3, col4,col5}){
    return(
        <thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">{col2}</th>
            <th scope="col">{col3}</th>
            <th scope="col">{col4}</th>
            <th scope="col">{col5}</th>
            <th scope="col">Status</th>
        </tr>
        </thead>
    )
}