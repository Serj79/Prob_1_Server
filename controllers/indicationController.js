const { Indication } = require("../models/models");

// Convert Javascript date to Pg YYYY MM DD HH MI SS

class IndicationController {
  async create(req, res) {
        console.log('89989889------****----',req.body)
        const{indicat_temp, dat}=req.body
      
        // const nDate =  pgFormatDate(dat)
        console.log('++++++++',indicat_temp, dat)
        const indication = await Indication.create({indicat_temp: indicat_temp ,
            date: dat
          })
        return res.json(indication)
   
  }

  async getAll(req, res) {
    const indication = await Indication.findAll();
    return res.json(indication);
  }
}

module.exports = new IndicationController();
