const mongoose = require("mongoose");

const Pano = require("../model/panoModel");
const Audio = require("../model/utils/audioModel");
const Barcode = require("../model/utils/barcodeModel");
const ChildRecord = require("../model/utils/childrecordModel");
const ChoiceList = require("../model/utils/choiceListModel");
const Counter = require("../model/utils/counterModel");
const Date = require("../model/utils/dateModel");
const DateRange = require("../model/utils/daterangeModel");
const DateTime = require("../model/utils/datetimeModel");
const Decimal = require("../model/utils/decimalModel");
const Document = require("../model/utils/documentModel");
const Email = require("../model/utils/emailModel");
const FaceVerification = require("../model/utils/faceverificationModel");
const GPS = require("../model/utils/gpsModel");
const GroupHeader = require("../model/utils/groupHeaderModel");
const MultiLineText = require("../model/utils/multiLinetTextModel");
const Number = require("../model/utils/numberModel");
const Phone = require("../model/utils/phoneModel");
const Photo = require("../model/utils/photoModel");
const QrCode = require("../model/utils/qrcodeModel");
const Signature = require("../model/utils/signatureModel");
const Stopwatch = require("../model/utils/stopwatchModel");
const Subform = require("../model/utils/subformModel");
const Text = require("../model/utils/textModel");
const Time = require("../model/utils/timeModel");
const TimeStamp = require("../model/utils/timestampModel");
const Toggle = require("../model/utils/toggleModel");
const UniqueId = require("../model/utils/uniqueidModel");
const Video = require("../model/utils/videoModel");
const WebLink = require("../model/utils/weblinkModel");

exports.createPano = async (req, res) => {
  try {
    const { panoName } = req.body;

    const existingPano = await Pano.findOne({ panoName });
    if (existingPano) {
      return res.status(400).json({ message: "Bu isimde bir pano zaten var!" });
    }

    const newPano = new Pano({ panoName, components: [] });
    await newPano.save();

    res.status(201).json({ message: "✅ Pano başarıyla oluşturuldu", newPano });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Pano oluşturulamadı", error: error.message });
  }
};

exports.deletePano = async (req, res) => {
  try {
    const { panoId } = req.params;
    const deletedPano = await Pano.findByIdAndDelete(panoId);

    if (!deletedPano) {
      return res.status(404).json({ message: "❌ Pano bulunamadı" });
    }

    res.status(200).json({ message: "✅ Pano başarıyla silindi", deletedPano });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Pano silinemedi", error: error.message });
  }
};

exports.addComponentToPano = async (req, res) => {
  try {
    const { panoId, componentType, componentId } = req.body;

    if (!panoId || !componentType) {
      return res
        .status(400)
        .json({ message: "❌ panoId ve componentType zorunludur." });
    }

    const pano = await Pano.findById(panoId);
    if (!pano) return res.status(404).json({ message: "❌ Pano bulunamadı" });

    const COMPONENT_MODELS = {
      Audio,
      Barcode,
      ChildRecord,
      ChoiceList,
      Counter,
      Date,
      DateRange,
      DateTime,
      Decimal,
      Document,
      Email,
      FaceVerification,
      GPS,
      GroupHeader,
      MultiLineText,
      Number,
      Phone,
      Photo,
      QrCode,
      Signature,
      Stopwatch,
      Subform,
      Text,
      Time,
      TimeStamp,
      Toggle,
      UniqueId,
      Video,
      WebLink,
    };

    if (!COMPONENT_MODELS[componentType]) {
      return res.status(400).json({ message: "❌ Geçersiz bileşen tipi" });
    }

    let component;

    if (componentId) {
      component = await COMPONENT_MODELS[componentType].findById(componentId);
      if (!component) {
        return res
          .status(404)
          .json({ message: `❌ ${componentType} bileşeni bulunamadı` });
      }
    } else {
      component = new COMPONENT_MODELS[componentType]({
        commonProperties: {
          uniqueIdentifier: new mongoose.Types.ObjectId().toString(),
        },
      });
      await component.save();
    }

    pano.components.push({ refId: component._id, type: componentType });
    await pano.save();

    res
      .status(200)
      .json({ message: "✅ Bileşen panoya eklendi", component, pano });
  } catch (error) {
    res.status(500).json({ message: error.message || "❌ Sunucu hatası" });
  }
};

exports.getPanoWithComponents = async (req, res) => {
  try {
    const pano = await Pano.findById(req.params.id).populate(
      "components.refId"
    );

    if (!pano) return res.status(404).json({ message: "❌ Pano bulunamadı" });

    res.status(200).json(pano);
  } catch (error) {
    res.status(500).json({
      message: "❌ Pano getirilirken hata oluştu.",
      error: error.message,
    });
  }
};

exports.removeComponentFromPano = async (req, res) => {
  try {
    const { panoId, componentId } = req.params;

    const pano = await Pano.findById(panoId);
    if (!pano) return res.status(404).json({ message: "❌ Pano bulunamadı" });

    pano.components = pano.components.filter(
      (comp) => comp.refId.toString() !== componentId
    );

    await pano.save();
    res.status(200).json({ message: "✅ Bileşen panodan kaldırıldı", pano });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateComponentInPano = async (req, res) => {
  try {
    const { componentId, updateData } = req.body;

    let updatedComponent =
      (await Audio.findByIdAndUpdate(componentId, updateData, { new: true })) ||
      (await Barcode.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await ChildRecord.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await ChoiceList.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Counter.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Date.findByIdAndUpdate(componentId, updateData, { new: true })) ||
      (await DateRange.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await DateTime.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Decimal.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Document.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Email.findByIdAndUpdate(componentId, updateData, { new: true })) ||
      (await FaceVerification.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await GPS.findByIdAndUpdate(componentId, updateData, { new: true })) ||
      (await GroupHeader.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await MultiLineText.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Number.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Phone.findByIdAndUpdate(componentId, updateData, { new: true })) ||
      (await Photo.findByIdAndUpdate(componentId, updateData, { new: true })) ||
      (await QrCode.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Signature.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Stopwatch.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Subform.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Text.findByIdAndUpdate(componentId, updateData, { new: true })) ||
      (await Time.findByIdAndUpdate(componentId, updateData, { new: true })) ||
      (await TimeStamp.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Toggle.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await UniqueId.findByIdAndUpdate(componentId, updateData, {
        new: true,
      })) ||
      (await Video.findByIdAndUpdate(componentId, updateData, { new: true })) ||
      (await WebLink.findByIdAndUpdate(componentId, updateData, { new: true }));

    if (!updatedComponent) {
      return res.status(404).json({ message: "❌ Bileşen bulunamadı" });
    }

    res
      .status(200)
      .json({ message: "✅ Bileşen başarıyla güncellendi", updatedComponent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPanos = async (req, res) => {
  try {
    const panos = await Pano.find().populate("components.refId");

    res.status(200).json({
      message: "✅ Tüm panolar getirildi.",
      panos,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Panolar getirilemedi.",
      error: error.message,
    });
  }
};

exports.updateComponentOrder = async (req, res) => {
  try {
    const { panoId, newOrder } = req.body;

    console.log("panoId", panoId);

    const pano = await Pano.findById(panoId);
    if (!pano) {
      console.log("❌ Pano bulunamadı, panoId yanlış olabilir.");
      return res
        .status(404)
        .json({ message: "❌ Pano bulunamadı, panoId yanlış olabilir." });
    }

    pano.components = newOrder.map((item) => ({
      refId: new mongoose.Types.ObjectId(item._id),
      type: item.type,
    }));

    await pano.save();
    // console.log("✅ Güncellenmemiş pano pano:", pano);
    // const updatedPano = await Pano.findById(panoId).populate("components.refId");
    // console.log("✅ Güncellenmiş pano:", updatedPano);

    res
      .status(200)
      .json({ message: "✅ Bileşen sıralaması güncellendi.", pano: pano });
  } catch (error) {
    console.error("❌ Sıralama güncellenirken hata oluştu:", error.message);
    res
      .status(500)
      .json({ message: "❌ Sıralama güncellenemedi.", error: error.message });
  }
};

exports.duplicateComponentInPano = async (req, res) => {
  try {
    const { panoId, componentId } = req.body;

    const COMPONENT_MODELS = {
      Audio,
      Barcode,
      ChildRecord,
      ChoiceList,
      Counter,
      Date,
      DateRange,
      DateTime,
      Decimal,
      Document,
      Email,
      FaceVerification,
      GPS,
      GroupHeader,
      MultiLineText,
      Number,
      Phone,
      Photo,
      QrCode,
      Signature,
      Stopwatch,
      Subform,
      Text,
      Time,
      TimeStamp,
      Toggle,
      UniqueId,
      Video,
      WebLink,
    };

    const pano = await Pano.findById(panoId);
    if (!pano) return res.status(404).json({ message: "❌ Pano bulunamadı" });

    const originalComponent = pano.components.find(
      (comp) => comp.refId.toString() === componentId
    );
    if (!originalComponent) {
      return res
        .status(404)
        .json({ message: "❌ Kopyalanacak bileşen bulunamadı" });
    }

    const componentType = originalComponent.type;
    if (!COMPONENT_MODELS[componentType]) {
      return res.status(400).json({ message: "❌ Geçersiz bileşen tipi" });
    }

    const oldComponent = await COMPONENT_MODELS[componentType].findById(
      componentId
    );
    if (!oldComponent) {
      return res
        .status(404)
        .json({ message: "❌ Eski bileşen verisi bulunamadı" });
    }

    const oldData = oldComponent.toObject();

    deepRemoveFields(oldData, ["_id", "createdAt", "updatedAt"]);

    if (oldData.commonProperties?.uniqueIdentifier) {
      oldData.commonProperties.uniqueIdentifier =
        new mongoose.Types.ObjectId().toString();
    }

    const newComponent = new COMPONENT_MODELS[componentType]({
      ...oldData,
      _id: new mongoose.Types.ObjectId(),
    });

    await newComponent.save();

    pano.components.push({ refId: newComponent._id, type: componentType });
    await pano.save();

    res.status(200).json({
      message: "✅ Bileşen başarıyla kopyalandı",
      newComponent,
      pano,
    });
  } catch (error) {
    console.error("❌ Kopyalama hatası:", error.message);
    res.status(500).json({
      message: "❌ Bileşen kopyalanırken hata oluştu",
      error: error.message,
    });
  }
};
function deepRemoveFields(obj, fields = ["_id", "createdAt", "updatedAt"]) {
  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      deepRemoveFields(obj[i], fields);
    }
  } else {
    for (const key in obj) {
      if (fields.includes(key)) {
        delete obj[key];
      } else if (obj[key] && typeof obj[key] === "object") {
        deepRemoveFields(obj[key], fields);
      }
    }
  }
}
