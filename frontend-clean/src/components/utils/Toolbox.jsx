import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComponentToPano,
  getPanoWithComponents,
} from "../../redux/PanoSlice";
import {
  Clock,
  Barcode,
  FileText,
  Calendar,
  Image,
  Phone,
  Video,
  Signature,
  MapPin,
  Type,
  List,
  Clipboard,
  Key,
  Link,
  Mail,
  File,
  ToggleLeft,
  AlignJustify,
} from "lucide-react";
import { LuScanBarcode } from "react-icons/lu";
import { PiClockCounterClockwiseDuotone } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { TbDecimal } from "react-icons/tb";
import { MdDomainVerification } from "react-icons/md";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { TbNumber44Small } from "react-icons/tb";
import { IoMdStopwatch } from "react-icons/io";
import { MdTimer } from "react-icons/md";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { AiOutlineAudio } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
function Toolbox({ selectedPanoId }) {
  const dispatch = useDispatch();
  const { currentPano } = useSelector((state) => state.Pano);
  const [isExpanded, setIsExpanded] = useState(false);

  const componentIcons = {
    Audio: <AiOutlineAudio size={20} />,
    Barcode: <LuScanBarcode size={20} />,
    ChildRecord: <Clipboard size={20} />,
    ChoiceList: <List size={20} />,
    Counter: <PiClockCounterClockwiseDuotone size={20} />,
    Date: <Calendar size={20} />,
    DateRange: <MdOutlineDateRange size={20} />,
    DateTime: <BsFillCalendarDateFill size={20} />,
    Decimal: <TbDecimal size={20} />,
    Document: <File size={20} />,
    Email: <Mail size={20} />,
    FaceVerification: <MdDomainVerification size={20} />,
    GPS: <MapPin size={20} />,
    GroupHeader: <AlignJustify size={20} />,
    MultiLineText: <BsReverseLayoutTextSidebarReverse size={20} />,
    Number: <TbNumber44Small size={20} />,
    Phone: <Phone size={20} />,
    Photo: <Image size={20} />,
    QrCode: <Barcode size={20} />,
    Signature: <Signature size={20} />,
    Stopwatch: <IoMdStopwatch size={20} />,
    Subform: <FileText size={20} />,
    Text: <Type size={20} />,
    Time: <Clock size={20} />,
    TimeStamp: <MdTimer size={20} />,
    Toggle: <ToggleLeft size={20} />,
    UniqueId: <Key size={20} />,
    Video: <Video size={20} />,
    WebLink: <Link size={20} />,
  };

  const componentTypes = Object.keys(componentIcons);
  const visibleItems = isExpanded
    ? componentTypes
    : componentTypes.slice(0, Math.floor(componentTypes.length / 2));
  const handleAddComponent = async (componentType) => {
    if (!currentPano?._id) {
      console.log("Pano yok");
      return;
    }
    await dispatch(
      addComponentToPano({ panoId: selectedPanoId, componentType })
    );
    await dispatch(getPanoWithComponents(selectedPanoId));
    toast.success(`${componentType} added`, {
      autoClose: 500,
    });
  };

  return (
    <div className=" top-20  relative shadow-lg rounded-lg w-16 p-2 flex flex-col items-center transition-all duration-300 ease-in-out ">
      <ToastContainer />
      <div
        className={`grid grid-cols-2 gap-y-6 gap-x-15 transition-all h-auto duration-300 ease-in-out ${
          isExpanded ? "max-h-auto " : "max-h-0 "
        }`}
      >
        {visibleItems.map((type) => (
          <button
            key={type}
            title={type}
            className="p-2 cursor-grab border-2 h-10 w-10  hover:bg-gray-200 active:bg-gray-300 rounded-md flex justify-center items-center"
            onClick={() => handleAddComponent(type)}
          >
            {componentIcons[type]}
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-2 mt-2 rounded-full cursor-pointer bg-gray-400 hover:bg-gray-300 transition-all absolute left-[35px] top-[424px] "
      >
        {isExpanded ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
      </button>
    </div>
  );
}

export default Toolbox;
