import React, { useState } from "react";
import Toolbox from "./utils/Toolbox";
import PanoCanvas from "./utils/PanoCanvas";
import TextPropertiesPanel from "./utils/propertiesPanels/TextPropertiesPanel";
import TimePropertiesPanel from "./utils/propertiesPanels/TimePropertiesPanel";
import PanoList from "./utils/PanoList";
import AudioPropertiesPanel from "./utils/propertiesPanels/AudioPropertiesPanel";
import BarcodePropertiesPanel from "./utils/propertiesPanels/BarcodePropertiesPanel";
import ChildRecordPropertiesPanel from "./utils/propertiesPanels/ChildRecordPropertiesPanel";
import ChoiceListPropertiesPanel from "./utils/propertiesPanels/ChoiceListPropertiesPanel";
import CounterPropertiesPanel from "./utils/propertiesPanels/CounterPropertiesPanel";
import DatePropertiesPanel from "./utils/propertiesPanels/DatePropertiesPanel";
import DateRangePropertiesPanel from "./utils/propertiesPanels/DateRangePropertiesPanel";
import DateTimePropertiesPanel from "./utils/propertiesPanels/DateTimePropertiesPanel";
import DecimalPropertiesPanel from "./utils/propertiesPanels/DecimalPropertiesPanel";
import DocumentPropertiesPanel from "./utils/propertiesPanels/DocumentPropertiesPanel";
import EmailPropertiesPanel from "./utils/propertiesPanels/EmailPropertiesPanel";
import FaceVerificationPropertiesPanel from "./utils/propertiesPanels/FaceVerificationPropertiesPanel";
import GPSPropertiesPanel from "./utils/propertiesPanels/GPSPropertiesPanel";
import GroupHeaderPropertiesPanel from "./utils/propertiesPanels/GroupHeaderPropertiesPanel";
import MultiLineTextPropertiesPanel from "./utils/propertiesPanels/MultiLineTextPropertiesPanel";
import NumberPropertiesPanel from "./utils/propertiesPanels/NumberPropertiesPanel";
import PhonePropertiesPanel from "./utils/propertiesPanels/PhonePropertiesPanel";
import PhotoPropertiesPanel from "./utils/propertiesPanels/PhotoPropertiesPanel";
import QRCodePropertiesPanel from "./utils/propertiesPanels/QRCodePropertiesPanel";
import SignaturePropertiesPanel from "./utils/propertiesPanels/SignaturePropertiesPanel";
import StopwatchPropertiesPanel from "./utils/propertiesPanels/StopwatchPropertiesPanel";
import SubformPropertiesPanel from "./utils/propertiesPanels/SubformPropertiesPanel";
import TimeStampPropertiesPanel from "./utils/propertiesPanels/TimeStampPropertiesPanel";
import TogglePropertiesPanel from "./utils/propertiesPanels/TogglePropertiesPanel";
import UniqueIdPropertiesPanel from "./utils/propertiesPanels/UniqueIdPropertiesPanel";
import VideoPropertiesPanel from "./utils/propertiesPanels/VideoPropertiesPanel";
import WebLinkPropertiesPanel from "./utils/propertiesPanels/WebLinkPropertiesPanel";
import { ToastContainer } from "react-toastify";

function PanoLayout() {
  const [selectedPanoId, setSelectedPanoId] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderPropertiesPanel = () => {
    if (!selectedComponent) {
      return <div>No component selected</div>;
    }

    switch (selectedComponent.type) {
      case "Text":
        return (
          <TextPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Time":
        return (
          <TimePropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Audio":
        return (
          <AudioPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Barcode":
        return (
          <BarcodePropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "ChildRecord":
        return (
          <ChildRecordPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "ChoiceList":
        return (
          <ChoiceListPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Counter":
        return (
          <CounterPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Date":
        return (
          <DatePropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "DateRange":
        return (
          <DateRangePropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "DateTime":
        return (
          <DateTimePropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Decimal":
        return (
          <DecimalPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Document":
        return (
          <DocumentPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Email":
        return (
          <EmailPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "FaceVerification":
        return (
          <FaceVerificationPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "GPS":
        return (
          <GPSPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "GroupHeader":
        return (
          <GroupHeaderPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "MultiLineText":
        return (
          <MultiLineTextPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Number":
        return (
          <NumberPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Phone":
        return (
          <PhonePropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Photo":
        return (
          <PhotoPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "QrCode":
        return (
          <QRCodePropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Signature":
        return (
          <SignaturePropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Stopwatch":
        return (
          <StopwatchPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Subform":
        return (
          <SubformPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "TimeStamp":
        return (
          <TimeStampPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Toggle":
        return (
          <TogglePropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "UniqueId":
        return (
          <UniqueIdPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "Video":
        return (
          <VideoPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      case "WebLink":
        return (
          <WebLinkPropertiesPanel
            selectedPanoId={selectedPanoId}
            selectedComponent={selectedComponent}
          />
        );
      default:
        return <div>No matching properties panel for this component type</div>;
    }
  };
  console.log("selectedComponent:", selectedComponent);

  return (
    <div className="flex h-screen w-[1536px] overflow-y-scroll scrollbar-hide  bg-gradient-to-r from-cyan-200 to-blue-200 ">
      <div className="min-w-[300px] p-4 ">
        <PanoList
          setSelectedComponent={setSelectedComponent}
          setSelectedPanoId={setSelectedPanoId}
          selectedPanoId={selectedPanoId}
        />
      </div>

      <div className="w-full  ml-10   p-4">
        <Toolbox selectedPanoId={selectedPanoId} />
      </div>

      <div className="w-full p-4 ">
        <PanoCanvas
          selectedComponent={selectedComponent}
          selectedPanoId={selectedPanoId}
          setSelectedComponent={setSelectedComponent}
        />
      </div>

      <div>
        <ToastContainer />
        <div className="w-full h-full  p-4   ">{renderPropertiesPanel()}</div>
      </div>
    </div>
  );
}

export default PanoLayout;
