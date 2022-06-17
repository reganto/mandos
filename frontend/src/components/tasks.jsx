export default function Tasks() {
    return (
        <div style={{ width: "40%" }}>
            <div className="form-group row">
                <input type="text" name="entry" id="entry" className="form-control col" placeholder="Add a new task..." />
                <button type="submit" className="btn btn-primary col-2">Submit</button>
            </div>
            <br />
            <div>
                <div className="row">
                    <div className="form-control col">foo</div>
                    <div className="col-1">
                        <a href="#"><img src="edit-color.webp" width={40} height={40} /></a>
                    </div>
                    <div className="col-1">
                        <a href="#"><img src="delete-color.webp" width={40} height={40} /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}