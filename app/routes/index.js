module.exports = function(application){
    application.post('/CreatePDV', (req, res) => {
        application.app.controllers.PDVController.CreatePDV(req , res);
    });
    application.post('/getPDVById', (req, res) => {
        application.app.controllers.PDVController.getPDVById(req , res);
    });
    application.post('/searchPDV', (req, res) => {
        application.app.controllers.PDVController.searchPDV(req , res);
    });
}