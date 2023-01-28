const data = {
  PC_Compounds: [
    {
      id: {
        id: {
          cid: 2244,
        },
      },
      props: [
        {
          urn: {
            label: 'Molecular Formula',
          },
          value: {
            sval: 'C16H19N3O5S',
          },
        },
        {
          urn: {
            label: 'Molecular Weight',
          },
          value: {
            fval: 365.44,
          },
        },
      ],
    },
  ],
  PropertyTable: {
    Properties: [
      {
        CID: 2244,
        MolecularFormula: 'C16H19N3O5S',
        MolecularWeight: 365.44,
        IUPACName: 'penicillin G',
        Title: 'Penicillin G',
      },
    ],
  },
};

// create a SDF file for the molecule Thymine (CID 2244)
// const sdf = new SDF(data);
// const sdfString = sdf.toString();
