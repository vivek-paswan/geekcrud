    import StudentModel from "../models/Student.js"

    class StudentController {
        static createDoc = async (req, res) => {
            try {
                const { name, age, fees } = req.body;
                const doc = new StudentModel({
                    name: name,
                    age: age,
                    fees: fees
                });
                const result = await doc.save();
                res.redirect("/student");
            } catch (error) {
                console.log(error);
                // Handle the error and possibly send an error response
                res.status(500).send("Internal Server Error");
            }
        }
        static getAllDoc = async (req, res) => {
            try {
                // Inside the try block, the code attempts to fetch all documents from the StudentModel.
                const result = await StudentModel.find();
        
                // The fetched data is then passed to a view engine for rendering.
                res.render("index", {data: result});
            } catch (error) {
                // If an error occurs during the try block, it is caught here, and an error message is logged.
                console.log(error);
            }
        }

        static editDoc = async (req, res) =>{
            // console.log(req.params.id)
            try{
                const result = await StudentModel.findById(req.params.id)
                // console.log(result)
                res.render("edit", {data:result})
            } catch (error) {
                console.log(error)
            }
           
        }

        // static updateDocById = async (req, res) =>{
        //     try {
        //         const result = await StudentModel.findByIdAndUpdate(req.params.id, req.body)
        //     } catch (error){
        //         console.log(error)
        //     }
        //     res.redirect("/student") 
        // }
        static updateDocById = async (req, res) => {
            try {
                const result = await StudentModel.findByIdAndUpdate(req.params.id, req.body);
        
                if (!result) {
                    // Document with the specified ID not found
                    return res.status(404).send("Document not found");
                }
        
                // Update successful
                res.redirect("/student");
            } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        };

        static deleteDocById = async (req, res) =>{
            //  console.log(req.params.id)
            try{
                const result = await StudentModel.findByIdAndDelete(req.params.id)
                res.redirect("/student") 
            } catch (error){
                console.log(error)
            }
           
        }
    }

    export default StudentController