import React from "react";
import { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";

const Cam = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  async function handleSubmit(img) {
    try {
      const body = { img };
      const { data } = await axios.post("/", body);
      // const { data } = await axios.post(
      //   "https://vision.googleapis.com/v1/projects/tough-racer-360515/location/us/images:annotate",
      //   {
      //     requests: [
      //       {
      //         image: {
      //           content: img,
      //         },
      //         features: [
      //           {
      //             type: "TEXT_DETECTION",
      //           },
      //         ],
      //         imageContext: {
      //           textDetectionParams: {
      //             enableTextDetectionConfidenceScore: true,
      //           },
      //         },
      //       },
      //     ],
      //   }
      // );
      console.log(data.fullTextAnnotation.text);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <Box maxW="450px" mx={10}>
        <Text py="10px" ml="8px" fontSize="32px" fontStyle="italic">
          snap a pic!
        </Text>
        {image === null ? (
          <>
            <Camera ref={camera} aspectRatio={8.5 / 11} />
            <Button
              onClick={() => setImage(camera.current.takePhoto())}
              colorScheme="teal"
            >
              <Text color="black">take photo</Text>
            </Button>
          </>
        ) : (
          <>
            <img src={image} alt="Taken" />
            <Button onClick={() => setImage(null)} colorScheme={"teal"}>
              <Text color="black">take another photo</Text>
            </Button>
            <Button onClick={() => handleSubmit(image)} colorScheme={"teal"}>
              <Text color="black">convert to text</Text>
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Cam;

// import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
// import { TextractClient } from "@aws-sdk/client-textract";
// // Set the AWS Region.
// const REGION = "us-west-2"; //e.g. "us-east-1"
// // Create SNS service object.
// const textractClient = new TextractClient({ region: REGION });
// const bucket = "buckets";
// const photo = "photo";
// // Set params
// const params = {
//   Document: {
//     S3Object: {
//       Bucket: bucket,
//       Name: photo,
//     },
//   },
//   FeatureTypes: ["TABLES", "FORMS"],
// };
// const displayBlockInfo = async (response) => {
//   try {
//     response.Blocks.forEach((block) => {
//       console.log(`ID: ${block.Id}`);
//       console.log(`Block Type: ${block.BlockType}`);
//       if ("Text" in block && block.Text !== undefined) {
//         console.log(`Text: ${block.Text}`);
//       } else {
//       }
//       if ("Confidence" in block && block.Confidence !== undefined) {
//         console.log(`Confidence: ${block.Confidence}`);
//       } else {
//       }
//       if (block.BlockType === "CELL") {
//         console.log("Cell info:");
//         console.log(` Column Index - ${block.ColumnIndex}`);
//         console.log(` Row - ${block.RowIndex}`);
//         console.log(` Column Span - ${block.ColumnSpan}`);
//         console.log(` Row Span - ${block.RowSpan}`);
//       }
//       if ("Relationships" in block && block.Relationships !== undefined) {
//         console.log(block.Relationships);
//         console.log("Geometry:");
//         console.log(` Bounding Box -
//  ${JSON.stringify(block.Geometry.BoundingBox)}`);
//         console.log(` Polygon -
//  ${JSON.stringify(block.Geometry.Polygon)}`);
//       }
//       console.log("-----");
//     });
//   } catch (err) {
//     console.log("Error", err);
//   }
// };
// const analyze_document_text = async () => {
//   try {
//     const analyzeDoc = new AnalyzeDocumentCommand(params);
//     const response = await textractClient.send(analyzeDoc);
//     //console.log(response)
//     displayBlockInfo(response);
//     return response; // For unit tests.
//   } catch (err) {
//     console.log("Error", err);
//   }
// };
// analyze_document_text();
