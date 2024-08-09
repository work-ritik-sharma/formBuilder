const Form = require('../models/formModel'); 

exports.addForm = async (req, res) => {
    const { fields, formHeader, formFooter } = req.body;

    try {
        const newForm = new Form({
            formHeader,
            fields,
            formFooter
        });

        const savedForm = await newForm.save();

        res.status(201).json({
            message: 'Form saved successfully',
            data: savedForm
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while saving the form',
            error: error.message
        });
    }
};


exports.fetchAllForms = async (req, res) => {
    try {
        const allForm = await Form.find();

        res.status(200).json({
            success: true,
            message: 'All Form',
            data: allForm
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching',
            data: {}
        });
    }
}


exports.fetchAForm = async (req, res) => {
    const formId = req.body.formId
    try {
        const formData = await Form.findOne({
            _id: formId
        });

        res.status(200).json({
            success: true,
            message: 'Fetching form',
            data: formData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching',
            data: {}
        });
    }

}


exports.editForm = async (req, res) => {
    const { formHeader, id, formFooter, fields } = req.body;

    try {
        const form = await Form.findOne({ _id: id });
        if (!form) {
            return res.status(404).json({
                success: false,
                message: 'No such form found',
                data: {}
            });
        }

        form.formHeader = formHeader;
        form.formFooter = formFooter;
        form.fields = fields;


        await form.save();

        res.status(200).json({
            success: true,
            message: 'Form updated successfully',
            data: form
        });

    } catch (error) {
        console.error(error, 'Error occurred while updating form');
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the form',
            data: {}
        });
    }
}



exports.deleteForm = async (req, res) => {
    const id = req.params.id;
    try {
        const form = await Form.findOneAndDelete({
            _id: id
        })

        res.status(200).json({
            success: true,
            message: 'The form was successfully deleted,',
            data: form
        })
    } catch (error) {
        console.error(error, 'Error occurred while updating form');
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the form',
            data: {}
        });
    }
}