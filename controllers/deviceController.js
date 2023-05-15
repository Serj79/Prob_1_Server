const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
        let {name, price, brandId, typeId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const device = await Device.create({name, price, brandId, typeId, img: fileName});

        if (info) {
            info = JSON.parse(info)
            info.forEach(i =>
                DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                })
            )
        }

        return res.json(device)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }

}

  // async create(req, res, next) {
  
  //   try {
  //     let { name, price, brandId, typeId, info } = req.body;
      
  //     const { img } = req.files;
  //     let fileName = uuid.v4() + ".jpg";
  //     // let fileName = "C:/magazin1/Server/static/6af925c0-5d85-431e-80ba-20999568cfb4.jpg";
  //     // console.log("++++",fileName)
  //     console.log("12121212", name, price, brandId, typeId, fileName);
  //     img.mv(path.resolve(__dirname, "..", "static", fileName));
  //     const device = await Device.create({name, price, brandId, typeId, img: fileName});
  //     if (info) {
  //       info = JSON.parse(info);
  //       console.log("rrrr", info);
  //       info.forEach((i) =>
  //         Device.create({
  //           title: i.title,
  //           description: i.description,
  //           deviceId: device.id,
  //         })
  //       );
  //     }
  //     // const device = await Device.create({
  //     //   name,
  //     //   price,
  //     //   brandId,
  //     //   typeId,
  //     //   img: fileName,
  //     // });

  //     return res.json(device);
  //   } catch {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    limit = limit || 9;
    page = page || 1;
    let offset = page * limit - limit;
    // console.log("brandId", brandId);
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeID },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
