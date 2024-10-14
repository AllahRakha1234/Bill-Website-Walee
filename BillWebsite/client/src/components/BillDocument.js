import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

const BillDocument = ({ billDetails }) => (
  <Document>
    <Page size="A4" style={{ padding: 30, fontSize: 12 }}>
      {/* Title Section */}
      <View className="mb-5 pb-2 border-b border-black">
        <Text className="text-xl underline font-bold">Electricity Bill</Text>
        <Text className="text-sm text-[#1301ff] mb-1">Name: {billDetails.name}</Text>
        <Text className="text-sm text-[#1301ff] mb-1">Address: {billDetails.address}</Text>
        <Text className="text-sm text-[#1301ff] mb-1">Apartment #: {billDetails.apartment}</Text>
        <Text className="text-sm text-[#1301ff] mb-1">HQ NUST, SECTOR H-12, ISLAMABAD</Text>
      </View>

      {/* Electricity Charges Section */}
      <View className="mb-5 pb-2 border-b border-black">
        <Text className="text-lg font-bold underline mb-2">Electricity Charges</Text>
        {Object.keys(billDetails.electricityBill).map((key) => (
          <View key={key} className="flex flex-row mb-1 border-b border-black">
            <Text className="flex-1 pr-2 text-[#1301ff]">{key}</Text>
            <Text className="flex-1 text-right">{billDetails.electricityBill[key]}</Text>
          </View>
        ))}
      </View>

      {/* Govt Charges Section */}
      <View className="mb-5 pb-2 border-b border-black">
        <Text className="text-lg font-bold underline mb-2">Govt Charges</Text>
        {Object.keys(billDetails.govtCharges).map((key) => (
          <View key={key} className="flex flex-row mb-1 border-b border-black">
            <Text className="flex-1 pr-2 text-[#1301ff]">{key}</Text>
            <Text className="flex-1 text-right">{billDetails.govtCharges[key]}</Text>
          </View>
        ))}
      </View>

      {/* Arrears Section */}
      <View className="mb-5 pb-2 border-b border-black">
        <Text className="text-lg font-bold underline mb-2">Arrears</Text>
        {Object.keys(billDetails.arrearsDetails).map((key) => (
          <View key={key} className="flex flex-row mb-1 border-b border-black">
            <Text className="flex-1 pr-2 text-[#1301ff]">{key}</Text>
            <Text className="flex-1 text-right">{billDetails.arrearsDetails[key]}</Text>
          </View>
        ))}
      </View>

      {/* Footer Section */}
      <View className="mb-5 pb-2 border-b border-black">
        <Text className="text-[#1301ff]">For Electric Supply Failure Contact:</Text>
        <Text className="text-[#1301ff]">Sub Engr. E&M: 0301 5596511</Text>
        <Text className="text-[#1301ff]">CH. E&M: 0300 5332432</Text>
        <Text className="text-[#1301ff]">Complaint Office: 051 9085 1279</Text>
      </View>
    </Page>
  </Document>
);

export default BillDocument;
