function FeedbackContainer({feedbacks}){
    return (
        <React.Fragment>
                <h3 className="yellow">Recent Feedback</h3>
                <div className="table-wrap">
                    <table className="table table-bordered table-striped">
                    <tbody>
                        <FeedbackRow feedbacks={feedbacks}/>
                    </tbody>
                    </table>
                </div>
        </React.Fragment>
    )

}

function FeedbackRow({feedbacks}){
    return (
        <React.Fragment>    
        {feedbacks.map(feedback => 
        <tr key={feedback.id}>
            <td>{feedback.rating} star<br/>
                {feedback.feedback}
            </td>
        </tr>)}
        </React.Fragment>
    )
}