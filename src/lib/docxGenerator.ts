import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  AlignmentType, 
  WidthType, 
  BorderStyle, 
  ShadingType,
  PageOrientation
} from 'docx';
import { saveAs } from 'file-saver';

export interface DocxTableColumn {
  header: string;
  key: string;
  widthPercent?: number;
}

export interface DocxGenerateOptions {
  title: string;
  subtitle?: string;
  schoolName: string;
  educationRegion: string;
  academicYear: string;
  officeName?: string;
  supervisorName?: string;
  coordinatorName?: string;
  principalName?: string;
  counselorName?: string;
  tableData?: {
    columns: string[];
    rows: (string | number)[][];
  };
  summaryItems?: { label: string; value: string | number }[];
  notes?: string;
  hijriDate?: string;
}

export async function generateAndDownloadDocx(options: DocxGenerateOptions) {
  const {
    title,
    subtitle,
    schoolName,
    educationRegion,
    academicYear = '1448هـ',
    officeName = 'مكتب التعليم شمال',
    supervisorName = 'أ. فاطمة بن خالد العتيبي',
    coordinatorName = 'أ. نورة بن فهد الشمري',
    principalName = 'أ. مريم بن عبدالله الغامدي',
    counselorName = 'أ. سارة بن سعد القحطاني',
    tableData,
    summaryItems,
    notes,
    hijriDate = '1448هـ'
  } = options;

  // Header Ministry Banner Table
  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.SINGLE, size: 12, color: '008489' },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          // Right cell: Region & Office
          new TableCell({
            width: { size: 35, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                bidirectional: true,
                children: [
                  new TextRun({ text: 'المملكة العربية السعودية', bold: true, size: 20, color: '1f2937' }),
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                bidirectional: true,
                children: [
                  new TextRun({ text: `الإدارة العامة للتعليم بمنطقة ${educationRegion || 'الرياض'}`, size: 18, color: '4b5563' })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                bidirectional: true,
                children: [
                  new TextRun({ text: `${officeName || 'مكتب التعليم شمال'} — ${schoolName}`, size: 18, color: '4b5563' })
                ]
              })
            ]
          }),
          // Center cell: Ministry of Education Logo text
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                bidirectional: true,
                children: [
                  new TextRun({ text: 'وزارة الـتـعـلـيـم', bold: true, size: 26, color: '008489' })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Ministry of Education', italics: true, size: 14, color: '6b7280' })
                ]
              })
            ]
          }),
          // Left cell: Date & Year
          new TableCell({
            width: { size: 35, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                bidirectional: true,
                children: [
                  new TextRun({ text: `العام الدراسي: ${academicYear}`, bold: true, size: 18, color: '1f2937' })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                bidirectional: true,
                children: [
                  new TextRun({ text: `التاريخ: ${hijriDate}`, size: 16, color: '4b5563' })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                bidirectional: true,
                children: [
                  new TextRun({ text: 'وثيقة رسمية معتمدة', size: 14, color: '008489' })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  // Title Table Banner
  const titleBanner = new Paragraph({
    alignment: AlignmentType.CENTER,
    bidirectional: true,
    spacing: { before: 280, after: 120 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 32,
        color: '093c42'
      })
    ]
  });

  const subtitlePara = subtitle ? new Paragraph({
    alignment: AlignmentType.CENTER,
    bidirectional: true,
    spacing: { after: 200 },
    children: [
      new TextRun({
        text: subtitle,
        size: 20,
        color: '4b5563'
      })
    ]
  }) : null;

  // Build Table if provided
  let contentTable: Table | null = null;
  if (tableData && tableData.columns.length > 0) {
    const colCount = tableData.columns.length;
    const colWidth = Math.floor(100 / colCount);

    const headerRow = new TableRow({
      tableHeader: true,
      children: tableData.columns.map(col => new TableCell({
        width: { size: colWidth, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, fill: '008489' },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            children: [
              new TextRun({ text: col, bold: true, color: 'ffffff', size: 18 })
            ]
          })
        ]
      }))
    });

    const dataRows = tableData.rows.map((row, idx) => new TableRow({
      children: row.map((cell) => new TableCell({
        width: { size: colWidth, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, fill: idx % 2 === 0 ? 'ffffff' : 'f9fafb' },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            children: [
              new TextRun({ text: String(cell), size: 17, color: '1f2937' })
            ]
          })
        ]
      }))
    }));

    contentTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: '008489' },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: '008489' },
        left: { style: BorderStyle.SINGLE, size: 4, color: 'd1d5db' },
        right: { style: BorderStyle.SINGLE, size: 4, color: 'd1d5db' },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'e5e7eb' },
        insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'e5e7eb' }
      },
      rows: [headerRow, ...dataRows]
    });
  }

  // Summary Grid if present
  let summaryTable: Table | null = null;
  if (summaryItems && summaryItems.length > 0) {
    const chunkedRows: TableRow[] = [];
    for (let i = 0; i < summaryItems.length; i += 2) {
      const item1 = summaryItems[i];
      const item2 = summaryItems[i + 1];

      chunkedRows.push(new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: 'f0fdf4' },
            children: [
              new Paragraph({
                bidirectional: true,
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: `${item1.label}: `, bold: true, color: '008489', size: 18 }),
                  new TextRun({ text: String(item1.value), bold: true, color: '1f2937', size: 18 })
                ]
              })
            ]
          }),
          item2 ? new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: 'f0fdf4' },
            children: [
              new Paragraph({
                bidirectional: true,
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: `${item2.label}: `, bold: true, color: '008489', size: 18 }),
                  new TextRun({ text: String(item2.value), bold: true, color: '1f2937', size: 18 })
                ]
              })
            ]
          }) : new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [new Paragraph({})]
          })
        ]
      }));
    }

    summaryTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: '10b981' },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: '10b981' },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'e5e7eb' },
        insideVertical: { style: BorderStyle.NONE }
      },
      rows: chunkedRows
    });
  }

  // Notes Paragraph
  const notesPara = notes ? new Paragraph({
    alignment: AlignmentType.RIGHT,
    bidirectional: true,
    spacing: { before: 200, after: 200 },
    children: [
      new TextRun({ text: 'ملاحظات وتوجيهات الإدارة: ', bold: true, color: 'b45309', size: 18 }),
      new TextRun({ text: notes, color: '374151', size: 18 })
    ]
  }) : null;

  // Signatures Table (3 Signatures matching Saudi Official School Documents)
  const signaturesTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: '008489' },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                bidirectional: true,
                children: [
                  new TextRun({ text: 'مسؤولة السجل / معدة التقرير', bold: true, size: 18, color: '1f2937' })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                bidirectional: true,
                children: [
                  new TextRun({ text: supervisorName || counselorName, color: '008489', bold: true, size: 18 })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'التوقيع: .....................', size: 14, color: '9ca3af' })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                bidirectional: true,
                children: [
                  new TextRun({ text: 'منسق/ة العمل التعاوني', bold: true, size: 18, color: '1f2937' })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                bidirectional: true,
                children: [
                  new TextRun({ text: coordinatorName, color: '008489', bold: true, size: 18 })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'التوقيع: .....................', size: 14, color: '9ca3af' })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                bidirectional: true,
                children: [
                  new TextRun({ text: 'مدير/ة المدرسة (الاعتماد الرسمي)', bold: true, size: 18, color: '1f2937' })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                bidirectional: true,
                children: [
                  new TextRun({ text: principalName, color: '008489', bold: true, size: 18 })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'الختم والاعتماد: .....................', size: 14, color: '9ca3af' })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  const docChildren: any[] = [
    headerTable,
    titleBanner
  ];

  if (subtitlePara) docChildren.push(subtitlePara);
  if (summaryTable) docChildren.push(summaryTable);
  if (contentTable) docChildren.push(contentTable);
  if (notesPara) docChildren.push(notesPara);
  docChildren.push(signaturesTable);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              bottom: 720,
              left: 720,
              right: 720
            }
          }
        },
        children: docChildren
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const cleanTitle = title.replace(/[/\\?%*:|"<>]/g, '-');
  saveAs(blob, `${cleanTitle} - ${schoolName} 1448هـ.docx`);
}
