export default function ReviewsBody() {

    return (
        <div>
            <h1>Reviews</h1>
            <p>Reviews</p>
            <label htmlFor="review">Review</label>
            <textarea id="review" name="review" cols={40} rows={10}></textarea>
            <button type="submit">Submit</button>
        </div>
    );
}