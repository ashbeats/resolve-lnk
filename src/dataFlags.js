/*
    Define LinkFlags structure
    ===
    @see [MS-SHLLINK].pdf section 2.1.1
    
    search for "2.1.1 LinkFlags" in the pdf. 
    
     The LinkFlags structure defines bits that specify which shell link structures are present in the file
     format after the ShellLinkHeader structure (section 2.1).
     
    References:
    https://github.com/EricZimmerman/Lnk/blob/9c8c9f49e1386b261cbd0ac6a891fed131cabb7d/Lnk/Header.cs#L9
    
    
    
 */

// const keyBy = require("../../utilities/keyBy.js");

const dataFlagsEric = [
  {
    name: "HasTargetIdList",
    offset: 0x00000001,
    description: "The LNK file contains a link target identifier"
  },
  {
    name: "HasLinkInfo",
    offset: 0x00000002,
    description: "The LNK file contains location information"
  },
  {
    name: "HasName",
    offset: 0x00000004,
    description: "The LNK file contains a Description data string"
  },
  {
    name: "HasRelativePath",
    offset: 0x00000008,
    description: "The LNK file contains a relative path data string"
  },
  {
    name: "HasWorkingDir",
    offset: 0x00000010,
    description: "The LNK file contains a working directory data string"
  },
  {
    name: "HasArguments",
    offset: 0x00000020,
    description: "The LNK file contains a command line arguments data string"
  },
  {
    name: "HasIconLocation",
    offset: 0x00000040,
    description: "The LNK file contains a custom icon location"
  },
  {
    name: "IsUnicode",
    offset: 0x00000080,
    description:
      "The data strings in the LNK file are stored in Unicode (UTF-16 little-endian) instead of ASCII"
  },
  {
    name: "ForceNoLinkInfo",
    offset: 0x00000100,
    description: "The location information is ignored"
  },
  {
    name: "HasExpString",
    offset: 0x00000200,
    description:
      "The LNK file contains environment variables location data block"
  },
  {
    name: "RunInSeparateProcess",
    offset: 0x00000400,
    description:
      "A 16-bit target application is run in a separate virtual machine."
  },
  {
    name: "HasDarwinId",
    offset: 0x00001000,
    description:
      "The LNK file contains a Darwin (Mac OS-X) properties data block"
  },
  {
    name: "RunAsUser",
    offset: 0x00002000,
    description: "The target application is run as a different user."
  },
  {
    name: "HasExpIcon",
    offset: 0x00004000,
    description: "The LNK file contains an icon location data block"
  },
  {
    name: "NoPidlAlias",
    offset: 0x00008000,
    description:
      "The file system location is represented in the shell namespace when the path to an item is parsed into the link target identifiers"
  },
  {
    name: "RunWithShimLayer",
    offset: 0x00020000,
    description:
      "The target application is run with the shim layer. The LNK file contains shim layer properties data block."
  },
  {
    name: "ForceNoLinkTrack",
    offset: 0x00040000,
    description:
      "The LNK does not contain a distributed link tracking data block"
  },
  {
    name: "EnableTargetMetadata",
    offset: 0x00080000,
    description: "The LNK file contains a metadata property store data block"
  },
  {
    name: "DisableLinkPathTracking",
    offset: 0x00100000,
    description: "The environment variables location block should be ignored"
  },

  { name: "DisableKnownFolderTracking", offset: 0x00200000 },
  { name: "DisableKnownFolderAlias", offset: 0x00400000 },
  { name: "AllowLinkToLink", offset: 0x00800000 },
  { name: "UnaliasOnSave", offset: 0x01000000 },
  { name: "PreferEnvironmentPath", offset: 0x02000000 },
  { name: "KeepLocalIdListForUncTarget", offset: 0x04000000 }
];

const dataFlags = [
  {
    name: "HasTargetIdList",
    offset: 0,
    description:
      "The shell link is saved with an item ID list (IDList). If this bit is set, a\n" +
      "LinkTargetIDList structure (section 2.2) MUST follow the ShellLinkHeader.\n" +
      "If this bit is not set, this structure MUST NOT be present.\n"
  },
  {
    name: "HasLinkInfo",
    offset: 1,
    description:
      "The shell link is saved with link information. If this bit is set, a LinkInfo\n" +
      "structure (section 2.3) MUST be present. If this bit is not set, this structure\n" +
      "MUST NOT be present.\n"
  },
  {
    name: "HasName",
    offset: 2,
    description:
      "The shell link is saved with a name string. If this bit is set, a\n" +
      "NAME_STRING StringData structure (section 2.4) MUST be present. If\n" +
      "this bit is not set, this structure MUST NOT be present."
  },
  {
    name: "HasRelativePath",
    offset: 3,
    description:
      "The shell link is saved with a relative path string. If this bit is set, a\n" +
      "RELATIVE_PATH StringData structure (section 2.4) MUST be present. "
  },
  {
    name: "HasWorkingDir",
    offset: 4,
    description:
      "The shell link is saved with a working directory string. If this bit is set, a\n" +
      "WORKING_DIR StringData structure (section 2.4) MUST be present."
  },
  {
    name: "HasArguments",
    offset: 5,
    description:
      "The shell link is saved with command line arguments. If this bit is set, a\n" +
      "COMMAND_LINE_ARGUMENTS StringData structure (section 2.4) MUST\n" +
      "be present. "
  },
  {
    name: "HasIconLocation",
    offset: 6,
    description: ""
  },
  {
    name: "IsUnicode",
    offset: 7,
    description:
      "The data strings in the LNK file are stored in Unicode (UTF-16 little-endian) instead of ASCII"
  },
  {
    name: "ForceNoLinkInfo",
    offset: 8,
    description: "The location information is ignored"
  }
];

// console.log('keyBy("name", dataFlags)', keyBy("name")(dataFlags))

/**
 *
 * @param flags
 * @returns {function(*): {
 *     {{}|{HasLinkTargetIDList: boolean, HasWorkingDir: boolean, IsUnicode: boolean, HasLinkInfo: boolean, HasName: boolean, HasRelativePath: boolean, HasArguments: boolean}}
 * }}
 */
const castToBits = flags => dataFlagInt => {
  // const link_flags = {
  //     HasLinkTargetIDList: !!(dataFlagInt & 0x00000001),
  //     HasLinkInfo: !!(dataFlagInt & 0x00000002),
  //     HasName: !!(dataFlagInt & 0x00000004),
  //     HasRelativePath: !!(dataFlagInt & 0x00000008),
  //     HasWorkingDir: !!(dataFlagInt & 0x00000010),
  //     HasArguments: !!(dataFlagInt & 0x00000020),
  //     IsUnicode: !!(dataFlagInt & 0x00000080),
  //     ForceNoLinkInfo: !!(dataFlagInt & 0x00040000),
  //   };

  return Object.entries(flags).reduce((prev, [i, flag]) => {
    // dd(flag)
    prev[flag.name] = !!(dataFlagInt & flag.offset);
    return prev;
  }, {});
};

module.exports = {
  castToDataFlags: castToBits(dataFlags)
};
