import XLSX from 'xlsx';

function cleanValue(value) {
return String(value || '')
.trim()
.toLowerCase();
}

function removeDuplicates(array) {
return [...new Set(array)];
}

function readDietRules(filePath) {


const workbook = XLSX.readFile(filePath);

const rules = {
    LCHF: {
        eliminate: [],
        add: []
    },

    LFV: {
        eliminate: [],
        add: []
    },

    allergies: []
};

// LCHF SHEET


const lchfSheetName =
    workbook.SheetNames.find(
        sheet =>
            sheet
                .toLowerCase()
                .includes('lchf')
    );

if (lchfSheetName) {

    const sheet =
        workbook.Sheets[lchfSheetName];

    const rows =
        XLSX.utils.sheet_to_json(
            sheet,
            { header: 1 }
        );

    for (let i = 1; i < rows.length; i++) {

        const eliminate =
            cleanValue(rows[i][0]);

        const add =
            cleanValue(rows[i][1]);

        if (eliminate) {
            rules.LCHF.eliminate.push(
                eliminate
            );
        }

        if (add) {
            rules.LCHF.add.push(add);
        }
    }
}

//LFV SHEET
 

const lfvSheetName =
    workbook.SheetNames.find(
        sheet =>
            sheet
                .toLowerCase()
                .includes('lfv')
    );

if (lfvSheetName) {

    const sheet =
        workbook.Sheets[lfvSheetName];

    const rows =
        XLSX.utils.sheet_to_json(
            sheet,
            { header: 1 }
        );

    for (let i = 1; i < rows.length; i++) {

        const eliminate =
            cleanValue(rows[i][0]);

        const add =
            cleanValue(rows[i][1]);

        if (eliminate) {
            rules.LFV.eliminate.push(
                eliminate
            );
        }

        if (add) {
            rules.LFV.add.push(add);
        }
    }
}

//Remove duplicates
 

rules.LCHF.eliminate =
    removeDuplicates(
        rules.LCHF.eliminate
    );

rules.LCHF.add =
    removeDuplicates(
        rules.LCHF.add
    );

rules.LFV.eliminate =
    removeDuplicates(
        rules.LFV.eliminate
    );

rules.LFV.add =
    removeDuplicates(
        rules.LFV.add
    );

rules.allergies =
    removeDuplicates(
        rules.allergies
    );

return rules;


}

module.exports = readDietRules;
