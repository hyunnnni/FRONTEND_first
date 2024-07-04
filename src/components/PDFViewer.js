// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';


// const PDFViewer = ({ urls }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }

//   return (
//     <div>
//       {urls.map((url, index) => (
//         <div key={index} style={{ marginBottom: '20px' }}>
//           <h3>계약서 {index + 1} </h3>
//           <div style={{ height: '750px' }}>
//             <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
//               <Page pageNumber={pageNumber} />
//             </Document>
//           </div>
//           <p>Page {pageNumber} of {numPages}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PDFViewer;