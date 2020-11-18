const {Table} = ReactBootstrap

function FeedbackContainer({feedbacks}){
    return (
        <React.Fragment>
                <h3 className="yellow">Recent Feedback</h3>
                <div className="table-wrap">
                    <Table bordered>
                        <tbody>
                            <FeedbackRow feedbacks={feedbacks}/>
                        </tbody>
                    </Table>
                </div>
        </React.Fragment>
    )

}

function FeedbackRow({feedbacks}){
    return (
        <React.Fragment>    
            {feedbacks.map(feedback => 
            <tr key={feedback.id}>
                <td>
                    {[...Array(feedback.rating)].map(
                        rating => <Star colorInput="#eba92a"/>
                    )}       
                    <br/>
                    {feedback.feedback}
                </td>
            </tr>
            )}
        </React.Fragment>
    )
}