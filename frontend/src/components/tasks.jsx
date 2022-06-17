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
                    <div className="form-control col" style={{ textAlign: "left" }}>Buy some tea from the store</div>
                    <div className="col-1">
                        <a href="#"><img src="edit-color.webp" width={35} height={35} /></a>
                    </div>
                    <div className="col-1">
                        <a href="#"><img src="delete-color.webp" width={35} height={35} /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}