const branches = {
  '2879130': 'expert Onlineshop',
  '1906889': 'expert HERFAG - Mühlhausen',
  '1907390': 'expert HERFAG - Leinefelde-Worbis',
  '1907427': 'expert HERFAG - Sondershausen',
  '2201255': 'expert HERFAG - Nordhausen',
  '14186758': 'expert HERFAG - Göttingen',
  '2268069': 'expert klein - Bad Hersfeld',
  '1907179': 'expert Teichert - Osterode',
  '1906866': 'K + B expert Ilmenau - Ilmenau',
  '1907398': 'Heinze & Bolek Elektronikmarkt GmbH - Meiningen',
  '1907303': 'expert Teichert - Northeim',
  '21578520': 'expert Riedel & Neumann - Blankenburg',
  '2739092': 'K + B expert Rudolstadt - Rudolstadt',
  '30584101': 'expert Riedel & Neumann - Einbeck',
  '2612239': 'expert Tradehouse - Hildburghausen',
  '1907043': 'expert Riedel & Neumann - Goslar',
  '2268063': 'expert klein - Petersberg',
  '1907316': 'expert Ommert - Petersberg',
  '1907443': 'expert Höxter - Höxter',
  '1907156': 'expert Holzminden - Holzminden',
  '1907468': 'Heinze & Bolek Elektronikmarkt GmbH - Neustadt',
  '22865533': 'expert Weissenfels - Weißenfels',
  '1907216': 'Heinze & Bolek Elektronikmarkt GmbH - Coburg',
  '2268081': 'expert Salzgitter - Salzgitter',
  '12609536': 'expert Wolfenbüttel - Wolfenbüttel',
  '1907106': 'expert Bad Kissingen - Bad Kissingen / Garitz',
  '22865532': 'expert Halle - Halle',
  '26799835': 'expert Jäger - Kretzschau OT Grana',
  '21476263': 'expert Kronach - Kronach',
  '21476261': 'expert Lichtenfels - Lichtenfels',
  '28516615': 'expert Schlegelmilch - Haßfurt',
  '1907378': 'expert Schweinfurt - Schweinfurt',
  '22865535': 'expert Leipzig - Leipzig',
  '2214116': 'expert Springe - Springe',
  '2734533': 'expert Laatzen - Laatzen',
  '29703322': 'expert Schlagenhauf  - Gemünden a. Main',
  '1906845': 'expert Lehrte - Lehrte',
  '25401149': 'expert Hof - Hof',
  '9290076': 'expert klein - Gelnhausen',
  '1907497': 'expert Jäger - Altenburg',
  '8971625': 'expert Bening - Detmold',
  '21476262': 'expert Bamberg - Hallstadt',
  '1907517': 'expert klein - Gießen',
  '1907281': 'expert Münchberg - Münchberg',
  '25135116': 'expert Bening - Lemgo',
  '13068220': 'expert Gifhorn - Gifhorn',
  '1907457': 'expert Rinteln - Rinteln',
  '1907286': 'expert Burgdorf - Burgdorf',
  '2739145': 'expert Langenhagen - Langenhagen',
  '1907357': 'expert klein - Friedberg',
  '18271100': 'expert Garbsen - Garbsen',
  '1907092': 'expert Stadthagen - Stadthagen',
  '1906923': 'expert klein - Wetzlar',
  '14756052': 'expert Döring - Bad Salzuflen',
  '1907229': 'expert Wunstorf - Wunstorf',
  '1907035': 'expert Beck - Würzburg',
  '9290075': 'expert klein - Hanau',
  '25401148': 'expert Jakob  - Bayreuth',
  '1907226': 'expert klein - Dillenburg',
  '15305380': 'expert Döring - Herford',
  '1907472': 'expert klein - Mainaschaff',
  '13134624': 'expert klein - Friedrichsdorf',
  '16149994': 'expert Neustadt - Neustadt a. Rbge.',
  '27284126': 'expert Höchstadt - Höchstadt',
  '1949034': 'expert Bening - Minden',
  '26647453': 'expert Celle - Celle',
  '14184028': 'expert Bening - Rheda-Wiedenbrück',
  '1907073': 'expert Döring - Löhne',
  '2268071': 'expert Forchheim - Forchheim',
  '1907554': 'expert Beck - Ochsenfurt',
  '22865534': 'expert Wittenberg - Lutherstadt Wittenberg',
  '1907128': 'expert klein - Burbach',
  '1907444': 'expert klein - Siegen',
  '1907058': 'expert Bünde - Bünde',
  '1907269': 'expert Hartmann - Neustadt an der Aisch',
  '31343294': 'expert Chemnitz - Chemnitz',
  '1906846': 'expert Döring - Lübbecke',
  '1907257': 'Weyand - Plettenberg',
  '15526147': 'expert klein - Olpe',
  '29938844': 'expert Schlagenhauf - Kleinheubach',
  '1907322': 'expert Wunder - Oschatz',
  '1907011': 'expert Nienburg - Nienburg',
  '2739093': 'expert klein - Betzdorf',
  '1907082': 'expert Hartmann - Bad Windsheim',
  '1907407': 'expert Geutner - Westerburg',
  '1907483': 'expert Melle - Melle',
  '30553854': 'expert Brumberg - Menden',
  '1907186': 'expert Schäfer (Elz) - Elz',
  '1907589': 'expert Fiedler - Annaberg-Buchholz',
  '17314681': 'expert klein - Hofheim-Wallau',
  '1907403': 'HEM expert - Bad Mergentheim',
  '1907090': 'expert klein - Hachenburg',
  '1907313': 'expert TeVi - Nürnberg',
  '1907455': 'expert Stommel - Michelstadt',
  '25910829': 'expert Salzwedel - Salzwedel',
  '1907418': 'expert TeVi - Nürnberg',
  '14756049': 'expert klein - Montabaur Heiligenroth',
  '30553851': 'expert Brumberg - Kamen',
  '2126219': 'HEM expert - Buchen',
  '1906966': 'expert klein - Waldbröl',
  '13068215': 'expert Uelzen - Uelzen',
  '22865531': 'expert Brandenburg - Brandenburg an der Havel',
  '24106176': 'expert Bening - Osnabrück',
  '14756046': 'expert klein - Altenkirchen',
  '13193164': 'expert rfe - elektro union - Freiberg',
  '14418634': 'expert Otto - Rathenow ',
  '1907371': 'expert Soltau - Soltau',
  '1907501': 'expert Garthe - Hagen',
  '1906881': 'expert TeVi - Schwabach',
  '1906928': 'expert Pötzsch - Gröditz',
  '1907013': 'expert Pötzsch - Bad Liebenwerda',
  '1907160': 'expert klein - Nastätten',
  '1906934': 'expert Bening - Verden',
  '1907041': 'expert Pötzsch - Elsterwerda',
  '1907176': 'K + B expert Amberg - Amberg',
  '28756292': 'expert Schaper - Damme',
  '1907365': 'HEM expert - Künzelsau',
  '1907441': 'expert Ellinghaus - Gevelsberg',
  '1907032': 'expert TeVi - Neumarkt',
  '1906944': 'expert klein - Koblenz',
  '12585539': 'expert Media-Park - Greven',
  '25910830': 'expert Wittenberge - Wittenberge',
  '1906884': 'HEM expert - Satteldorf',
  '1907536': 'expert Schlagenhauf - Feuchtwangen',
  '1906830': 'expert Loskill - Castrop-Rauxel',
  '26051723': 'expert Freital - Freital',
  '1907050': 'expert klein - Neuwied',
  '7841751': 'expert Rial-Kauf - Ibbenbüren',
  '1907298': 'expert Drüke + Loskill - Herne',
  '1907359': 'expert Rotenburg - Rotenburg',
  '2426079': 'expert Schlagenhauf - Gunzenhausen',
  '2228014': 'expert Bening - Vechta',
  '25135118': 'expert Bening - Vechta',
  '1906858': 'expert Media-Park - Emsdetten',
  '27613192': 'expert Klein - Siegburg',
  '1907435': 'expert Pasternak - Bochum',
  '1907362': 'expert Pötzsch - Finsterwalde',
  '30481005': 'expert Lüneburg - Lüneburg',
  '1907204': 'HEM expert - Schwäbisch Hall',
  '28570377': 'expert Herfort - Bergisch Gladbach',
  '1907297': 'expert klein - Bad Kreuznach',
  '30725279': 'expert Bad Honnef - Bad Honnef',
  '1907324': 'expert Esch City - Mannheim',
  '1907279': 'expert Schultes - Solingen',
  '1907031': 'expert Esch Neckarau - Mannheim',
  '1906936': 'K + B expert Schwandorf - Schwandorf',
  '1906930': 'expert Bielinsky Am Dickobskreuz - Bonn',
  '15090077': 'expert Schlagenhauf - Weißenburg',
  '1907323': 'expert Media-Park  - Steinfurt',
  '25731520': 'expert Wallraff - Leverkusen',
  '26051722': 'expert Pirna - Pirna',
  '1907301': 'expert Ahaus - Coesfeld',
  '1907518': 'expert ZEESENer - Rangsdorf',
  '14756048': 'expert klein - Mayen',
  '1907185': 'expert Bielinsky - Bad Neuenahr-Ahrweiler',
  '1906832': 'expert Hoffmann - Köln',
  '1907227': 'expert Bening - Delmenhorst',
  '1906983': 'expert Schlagenhauf - Ellwangen',
  '25135115': 'expert Bening - Cloppenburg',
  '15526151': 'expert Hoffmann - Monheim',
  '1907110': 'expert ZEESENer - Königs Wusterhausen/OT Zeesen',
  '1907439': 'expert Bild und Ton - Neuruppin',
  '2469251': 'expert Geesthacht - Geesthacht',
  '1906905': 'expert Ochtrup - Ochtrup',
  '26276154': 'expert Pötzsch - Senftenberg',
  '14756051': 'expert Dormagen - Dormagen',
  '1907395': 'expert Bening - Osterholz-Scharmbeck',
  '1906925': 'expert de Witte - Schüttorf',
  '1907256': 'expert Müller Nördlingen - Nördlingen',
  '2552963': 'expert Neuss - Neuss',
  '1907122': 'HEM expert - Backnang',
  '31992607': 'Gröblinghoff Outlet - Neuss',
  '24993632': 'expert Ahaus - Borken',
  '1907097': 'expert Ahaus - Ahaus',
  '7124907': 'expert Arndt - Eichstätt',
  '1907543': 'expert Bening - Buxtehude',
  '25254886': 'ESC - Bischofswerda',
  '18323570': 'expert Dinslaken - Dinslaken',
  '1907470': 'expert Schlagenhauf - Aalen',
  '1906988': 'expert HERBA electronic - Gronau',
  '1907245': 'expert Rial-Kauf - Lingen',
  '29932478': 'expert Euskirchen - Euskirchen',
  '24583746': 'HEM expert - Bietigheim-Bissingen',
  '1907363': 'ESC - Hoyerswerda',
  '25135117': 'expert Bening - Oldenburg',
  '29487094': 'expert Gröblinghoff - Bergheim',
  '29514128': 'expert Kohne - Werlte',
  '31315790': 'expert Sebnitz - Sebnitz',
  '1907351': 'K + B expert Cham - Cham',
  '28713528': 'expert Demirbas - Wesel',
  '1907123': 'expert Reng - Kelheim',
  '1907267': 'expert Thomas-Electronic - Hamburg/Osdorf',
  '22326563': 'expert Nordhorn - Nordhorn',
  '1907423': 'expert Elektroland - Heidenheim',
  '1907188': 'expert Arndt - Donauwörth',
  '8956393': 'expert Kamp-Lintfort - Kamp-Lintfort',
  '1907213': 'expert Bening - Bremervörde',
  '25254885': 'ESC - Bautzen',
  '18751463': 'ESC - Cottbus',
  '24686946': 'expert Brake - Brake',
  '1907380': 'expert Reng - Neustadt',
  '20664204': 'expert Schwerin - Schwerin',
  '1907083': 'expert Bening - Stade',
  '1907117': 'K + B expert Kötzting - Bad Kötzting',
  '1907146': 'expert ZEESENer - Fürstenwalde',
  '1906999': 'expert Brings - Düren',
  '26344894': 'expert Viersen - Viersen',
  '20575054': 'Techno-Land - Deizisau',
  '24135176': 'expert Xanten - Xanten',
  '29932479': 'expert Wittlich - Wittlich',
  '1907343': 'expert BOmedia - Haren',
  '1907334': 'expert Elektro-Alster-Nord - Norderstedt',
  '1906954': 'expert Dillingen - Dillingen an der Donau',
  '1906958': 'expert Bening - Bremerhaven',
  '18715863': 'expert Bening - Elmshorn',
  '2917802': 'expert Ebersbach - Ebersbach-Neugersdorf',
  '19972181': 'expert Oberlausitz - Weißwasser',
  '22820487': 'expert Nordenham - Nordenham',
  '1907446': 'expert Bening - Bremerhaven',
  '1907361': 'expert MegaLand Bad Oldesloe - Bad Oldesloe',
  '1906984': 'expert Kröhnke - Böblingen',
  '1907100': 'expert Schrobenhausen - Schrobenhausen',
  '2237090': 'expert Straubing - Straubing',
  '1907367': 'expert Simmerath - Simmerath',
  '2739126': 'expert Bening - Papenburg',
  '16015652': 'HEM expert - Calw',
  '1907174': 'expert Meiners - Glückstadt',
  '1907585': 'expert Octomedia - Rastatt',
  '1907159': 'expert Pfaffenhofen - Pfaffenhofen',
  '1907162': 'expert Günzburg - Günzburg',
  '19972180': 'expert Oberlausitz - Niesky',
  '1906924': 'expert Bening - Leer',
  '1907217': 'expert Bening - Wilhelmshaven',
  '1906960': 'K + B expert Regen - Regen',
  '15747859': 'expert Nord - Wismar',
  '1907071': 'expert TeVi - Landshut',
  '1906876': 'expert TeVi - Deggendorf',
  '1906849': 'ESC - Görlitz',
  '2673978': 'expert Brunsbüttel - Brunsbüttel',
  '1907161': 'expert Henkel + Bast - Konz',
  '1907299': 'expert Plattling - Plattling',
  '1907172': 'expert Dingolfing - Dingolfing',
  '1907238': 'expert Bening - Cuxhaven',
  '2204139': 'expert Octomedia - Bühl',
  '8068814': 'HEM expert - Mössingen',
  '1906130': 'expert Nord - Neumünster',
  '27509128': 'expert Ehingen - Ehingen (Donau)',
  '15747852': 'expert Nord - Neubrandenburg',
  '7112105': 'expert Nord - Neustadt',
  '1906888': 'expert Bening - Aurich',
  '1906965': 'expert MegaLand Eutin - Eutin',
  '1907353': 'expert Media Elektra - Achern',
  '1906885': 'expert Bening - Emden',
  '1906921': 'expert Haug - Freudenstadt',
  '1906875': 'expert THEINER - Vilshofen',
  '2066675': 'expert Oehler - Kehl',
  '27381619': 'expert MegaStore - Landsberg am Lech',
  '1907154': 'expert Oehler - Offenburg',
  '1907453': 'expert Heide - Heide',
  '1907202': 'expert Bening - Norden',
  '1907187': 'K + B expert Waldkirchen - Waldkirchen',
  '1907034': 'expert THEINER - Pfarrkirchen',
  '2268075': 'expert Sigmaringen - Sigmaringen',
  '2150035': 'expert Bad Saulgau - Bad Saulgau',
  '1907476': 'expert Zeiller - Waldkraiburg',
  '1907199': 'expert TeVi - Passau',
  '1906836': 'expert TeVi - Neuötting',
  '1907488': 'expert Keßler - Bad Waldsee',
  '22457709': 'expert Octomedia - Lahr',
  '13068209': 'expert Jöhnk - Eckernförde',
  '1907429': 'expert THEINER - Pocking',
  '1907140': 'expert HOERCO - Villingen-Schwenningen',
  '2268016': 'expert Holzkirchen - Holzkirchen',
  '1907577': 'expert Marktoberdorf - Marktoberdorf',
  '1907259': 'expert MegaLand Schleswig - Schleswig',
  '1907049': 'expert Husum - Husum',
  '15747853': 'expert Nord - Neuenkirchen',
  '1907060': 'expert Traunreut  - Traunreut',
  '1907537': 'expert Bad Tölz - Bad Tölz',
  '2144945': 'expert Überlingen - Überlingen',
  '2268070': 'expert Wangen - Wangen',
  '2144096': 'HEM expert - Singen',
  '1906839': 'expert Füssen - Füssen',
  '1907243': 'expert Sonthofen - Sonthofen',
  '20664203': 'expert Flensburg - Flensburg',
  '25263919': 'expert Octomedia - Waldshut-Tiengen',
  '26802905': 'expert Villringer - Schopfheim',
  '14756041': 'expert Villringer - Bad Säckingen',
  '1907438': 'expert Villringer - Lörrach',
};

// example at branchesArray[0]: { branchId: 'e_1906130', market: 'expert Nord - Neumünster' }
export const branchesArray = createBranchesArray();

function createBranchesArray() {
  const tempBranchesArray = [];
  for (const branch of Object.keys(branches)) {
    tempBranchesArray.push({
      branch_id: parseInt(branch),
      market: branches[branch],
    });
  }
  return tempBranchesArray;
}

export const branchesExt = {
  'expert klein':
    [{ id: 17314681, name: 'expert klein', city: 'Hofheim-Wallau' },
    { id: 13134624, name: 'expert klein', city: 'Friedrichsdorf' },
    { id: 1907160, name: 'expert klein', city: 'Nastätten' },
    {
      id: 14756049,
      name: 'expert klein',
      city: 'Montabaur Heiligenroth'
    },
    { id: 1907357, name: 'expert klein', city: 'Friedberg' },
    { id: 1906923, name: 'expert klein', city: 'Wetzlar' },
    { id: 1907517, name: 'expert klein', city: 'Gießen' },
    { id: 1906944, name: 'expert klein', city: 'Koblenz' },
    { id: 9290075, name: 'expert klein', city: 'Hanau' },
    { id: 1907297, name: 'expert klein', city: 'Bad Kreuznach' },
    { id: 1907226, name: 'expert klein', city: 'Dillenburg' },
    { id: 1907090, name: 'expert klein', city: 'Hachenburg' },
    { id: 1907128, name: 'expert klein', city: 'Burbach' },
    { id: 1907050, name: 'expert klein', city: 'Neuwied' },
    { id: 1907472, name: 'expert klein', city: 'Mainaschaff' },
    { id: 9290076, name: 'expert klein', city: 'Gelnhausen' },
    { id: 14756046, name: 'expert klein', city: 'Altenkirchen' },
    { id: 2739093, name: 'expert klein', city: 'Betzdorf' },
    { id: 14756048, name: 'expert klein', city: 'Mayen' },
    { id: 1907444, name: 'expert klein', city: 'Siegen' },
    { id: 1906966, name: 'expert klein', city: 'Waldbröl' },
    { id: 15526147, name: 'expert klein', city: 'Olpe' },
    { id: 2268063, name: 'expert klein', city: 'Petersberg' },
    { id: 2268069, name: 'expert klein', city: 'Bad Hersfeld' }],
  'expert Schäfer (Elz)': [{ id: 1907186, name: 'expert Schäfer (Elz)', city: 'Elz' }],
  'expert Jourdan':
    [{
      id: 1906920,
      name: 'expert Jourdan',
      city: 'Mörfelden-Walldorf'
    }],
  'expert Geutner': [{ id: 1907407, name: 'expert Geutner', city: 'Westerburg' }],
  'expert Zwiener': [{ id: 2268010, name: 'expert Zwiener', city: 'Groß-Umstadt' }],
  'expert Queckenberg': [{ id: 1907555, name: 'expert Queckenberg', city: 'Bad Breisig' }],
  'expert Klein':
    [{ id: 31952339, name: 'expert Klein', city: 'Marburg-Wehrda' },
    { id: 27613192, name: 'expert Klein', city: 'Siegburg' }],
  'expert Mainland-Spessart ':
    [{
      id: 31826550,
      name: 'expert Mainland-Spessart ',
      city: 'Elsenfeld'
    },
    {
      id: 29938844,
      name: 'expert Mainland-Spessart ',
      city: 'Kleinheubach'
    },
    {
      id: 29703322,
      name: 'expert Mainland-Spessart ',
      city: 'Gemünden a. Main'
    },
    {
      id: 31826547,
      name: 'expert Mainland-Spessart ',
      city: 'Marktheidenfeld'
    }],
  'expert Stommel': [{ id: 1907455, name: 'expert Stommel', city: 'Michelstadt' }],
  'expert Bad Honnef': [{ id: 30725279, name: 'expert Bad Honnef', city: 'Bad Honnef' }],
  'expert Esch City': [{ id: 1907324, name: 'expert Esch City', city: 'Mannheim' }],
  'expert Bielinsky':
    [{
      id: 1907185,
      name: 'expert Bielinsky',
      city: 'Bad Neuenahr-Ahrweiler'
    }],
  'expert Esch Neckarau': [{ id: 1907031, name: 'expert Esch Neckarau', city: 'Mannheim' }],
  'expert Nicolin':
    [{
      id: 1907333,
      name: 'expert Nicolin',
      city: 'Neunkirchen-Seelscheid'
    }],
  'expert Bielinsky Am Dickobskreuz':
    [{
      id: 1906930,
      name: 'expert Bielinsky Am Dickobskreuz',
      city: 'Bonn'
    }],
  'expert Föster': [{ id: 1906926, name: 'expert Föster', city: 'Schmallenberg' }],
  'expert Beck':
    [{
      id: 31826557,
      name: 'expert Beck',
      city: 'Wertheim-Bestenheid'
    },
    { id: 1907035, name: 'expert Beck', city: 'Würzburg' },
    { id: 1907554, name: 'expert Beck', city: 'Ochsenfurt' },
    { id: 31826556, name: 'expert Beck', city: 'Kitzingen' }],
  'expert Wittlich': [{ id: 29932479, name: 'expert Wittlich', city: 'Wittlich' }],
  'expert Ommert': [{ id: 1907316, name: 'expert Ommert', city: 'Petersberg' }],
  'expert Reinhart': [{ id: 1907057, name: 'expert Reinhart', city: 'Külsheim' }],
  'HEM expert':
    [{ id: 2126219, name: 'HEM expert', city: 'Buchen' },
    { id: 1907403, name: 'HEM expert', city: 'Bad Mergentheim' },
    { id: 1907365, name: 'HEM expert', city: 'Künzelsau' },
    {
      id: 24583746,
      name: 'HEM expert',
      city: 'Bietigheim-Bissingen'
    },
    { id: 1907204, name: 'HEM expert', city: 'Schwäbisch Hall' },
    { id: 1907122, name: 'HEM expert', city: 'Backnang' },
    { id: 16015652, name: 'HEM expert', city: 'Calw' },
    { id: 1906884, name: 'HEM expert', city: 'Satteldorf' },
    { id: 8068814, name: 'HEM expert', city: 'Mössingen' },
    { id: 2144096, name: 'HEM expert', city: 'Singen' }],
  'expert Euskirchen': [{ id: 29932478, name: 'expert Euskirchen', city: 'Euskirchen' }],
  Weyand: [{ id: 1907257, name: 'Weyand', city: 'Plettenberg' }],
  'expert Herfort':
    [{
      id: 28570377,
      name: 'expert Herfort',
      city: 'Bergisch Gladbach'
    }],
  'expert Ulmcke': [{ id: 1907234, name: 'expert Ulmcke', city: 'Homburg' }],
  'expert Hoffmann': [{ id: 1906832, name: 'expert Hoffmann', city: 'Köln' }],
  'expert Wallraff': [{ id: 25731520, name: 'expert Wallraff', city: 'Leverkusen' }],
  'expert Bad Kissingen':
    [{
      id: 1907106,
      name: 'expert Bad Kissingen',
      city: 'Bad Kissingen / Garitz'
    }],
  'expert Henkel + Bast': [{ id: 1907161, name: 'expert Henkel + Bast', city: 'Konz' }],
  'expert Schultes': [{ id: 1907279, name: 'expert Schultes', city: 'Solingen' }],
  'expert Brumberg':
    [{ id: 30553854, name: 'expert Brumberg', city: 'Menden' },
    { id: 30553851, name: 'expert Brumberg', city: 'Kamen' }],
  'expert Garthe': [{ id: 1907501, name: 'expert Garthe', city: 'Hagen' }],
  'expert Ellinghaus':
    [{ id: 29503624, name: 'expert Ellinghaus', city: 'Arnsberg' },
    { id: 1907441, name: 'expert Ellinghaus', city: 'Gevelsberg' },
    { id: 17223295, name: 'expert Ellinghaus', city: 'Dortmund' }],
  'expert Gröblinghoff': [{ id: 29487094, name: 'expert Gröblinghoff', city: 'Bergheim' }],
  'expert Dormagen': [{ id: 14756051, name: 'expert Dormagen', city: 'Dormagen' }],
  'expert Gerlach': [{ id: 1907358, name: 'expert Gerlach', city: 'Marsberg' }],
  'expert Brings': [{ id: 1906999, name: 'expert Brings', city: 'Düren' }],
  'expert Schweinfurt': [{ id: 1907378, name: 'expert Schweinfurt', city: 'Schweinfurt' }],
  'expert Schlemmer': [{ id: 2544594, name: 'expert Schlemmer', city: 'Saarwellingen' }],
  'expert Simmerath': [{ id: 1907367, name: 'expert Simmerath', city: 'Simmerath' }],
  'expert Neuss': [{ id: 2552963, name: 'expert Neuss', city: 'Neuss' }],
  'expert Humpert': [{ id: 1907260, name: 'expert Humpert', city: 'Werl' }],
  'expert Elektra Ensdorf': [{ id: 1907173, name: 'expert Elektra Ensdorf', city: 'Ensdorf' }],
  'expert Octomedia':
    [{ id: 1907585, name: 'expert Octomedia', city: 'Rastatt' },
    { id: 2204139, name: 'expert Octomedia', city: 'Bühl' },
    { id: 22457709, name: 'expert Octomedia', city: 'Lahr' },
    {
      id: 25263919,
      name: 'expert Octomedia',
      city: 'Waldshut-Tiengen'
    }],
  'expert Bad Salzungen':
    [{
      id: 32354097,
      name: 'expert Bad Salzungen',
      city: 'Bad Salzungen'
    }],
  'expert Zink': [{ id: 1907392, name: 'expert Zink', city: 'Gerolzhofen' }],
  'Heinze & Bolek Elektronikmarkt GmbH':
    [{
      id: 1907398,
      name: 'Heinze & Bolek Elektronikmarkt GmbH',
      city: 'Meiningen'
    },
    {
      id: 1907216,
      name: 'Heinze & Bolek Elektronikmarkt GmbH',
      city: 'Coburg'
    },
    {
      id: 1907468,
      name: 'Heinze & Bolek Elektronikmarkt GmbH',
      city: 'Neustadt'
    }],
  'expert Pasternak': [{ id: 1907435, name: 'expert Pasternak', city: 'Bochum' }],
  'expert Loskill': [{ id: 1906830, name: 'expert Loskill', city: 'Castrop-Rauxel' }],
  'expert Drüke + Loskill': [{ id: 1907298, name: 'expert Drüke + Loskill', city: 'Herne' }],
  'expert Rinsche': [{ id: 1907406, name: 'expert Rinsche', city: 'Hamm' }],
  'expert Schmalkalden':
    [{
      id: 32354099,
      name: 'expert Schmalkalden',
      city: 'Schmalkalden'
    }],
  'expert Schlegelmilch': [{ id: 28516615, name: 'expert Schlegelmilch', city: 'Haßfurt' }],
  'expert Eschwege': [{ id: 31952340, name: 'expert Eschwege', city: 'Eschwege' }],
  'expert Beverungen': [{ id: 1906899, name: 'expert Beverungen', city: 'Paderborn' }],
  'expert Promedia': [{ id: 1907430, name: 'expert Promedia', city: 'Ahlen' }],
  'expert Viersen': [{ id: 26344894, name: 'expert Viersen', city: 'Viersen' }],
  'expert Hartmann':
    [{ id: 1907082, name: 'expert Hartmann', city: 'Bad Windsheim' },
    {
      id: 1907269,
      name: 'expert Hartmann',
      city: 'Neustadt an der Aisch'
    }],
  'expert Tradehouse':
    [{
      id: 2612239,
      name: 'expert Tradehouse',
      city: 'Hildburghausen'
    }],
  'expert Heinsberg': [{ id: 32667526, name: 'expert Heinsberg', city: 'Heinsberg' }],
  'expert Bening':
    [{
      id: 14184028,
      name: 'expert Bening',
      city: 'Rheda-Wiedenbrück'
    },
    { id: 8971625, name: 'expert Bening', city: 'Detmold' },
    { id: 25135116, name: 'expert Bening', city: 'Lemgo' },
    { id: 24106176, name: 'expert Bening', city: 'Osnabrück' },
    { id: 1949034, name: 'expert Bening', city: 'Minden' },
    { id: 25135118, name: 'expert Bening', city: 'Vechta' },
    { id: 2228014, name: 'expert Bening', city: 'Vechta' },
    { id: 25135115, name: 'expert Bening', city: 'Cloppenburg' },
    { id: 1906934, name: 'expert Bening', city: 'Verden' },
    { id: 1907227, name: 'expert Bening', city: 'Delmenhorst' },
    { id: 25135117, name: 'expert Bening', city: 'Oldenburg' },
    { id: 2739126, name: 'expert Bening', city: 'Papenburg' },
    {
      id: 1907395,
      name: 'expert Bening',
      city: 'Osterholz-Scharmbeck'
    },
    { id: 1906924, name: 'expert Bening', city: 'Leer' },
    { id: 1906885, name: 'expert Bening', city: 'Emden' },
    { id: 1906888, name: 'expert Bening', city: 'Aurich' },
    { id: 1906958, name: 'expert Bening', city: 'Bremerhaven' },
    { id: 1907217, name: 'expert Bening', city: 'Wilhelmshaven' },
    { id: 1907213, name: 'expert Bening', city: 'Bremervörde' },
    { id: 1907446, name: 'expert Bening', city: 'Bremerhaven' },
    { id: 1907543, name: 'expert Bening', city: 'Buxtehude' },
    { id: 1907202, name: 'expert Bening', city: 'Norden' },
    { id: 1907083, name: 'expert Bening', city: 'Stade' },
    { id: 1907238, name: 'expert Bening', city: 'Cuxhaven' },
    { id: 18715863, name: 'expert Bening', city: 'Elmshorn' }],
  'expert Media Elektra': [{ id: 1907353, name: 'expert Media Elektra', city: 'Achern' }],
  'expert Kröhnke': [{ id: 1906984, name: 'expert Kröhnke', city: 'Böblingen' }],
  'expert Dinslaken': [{ id: 18323570, name: 'expert Dinslaken', city: 'Dinslaken' }],
  'expert HERFAG':
    [{ id: 14186758, name: 'expert HERFAG', city: 'Göttingen' },
    { id: 1906889, name: 'expert HERFAG', city: 'Mühlhausen' },
    { id: 1907390, name: 'expert HERFAG', city: 'Leinefelde-Worbis' },
    { id: 1907427, name: 'expert HERFAG', city: 'Sondershausen' },
    { id: 2201255, name: 'expert HERFAG', city: 'Nordhausen' }],
  'expert Kamp-Lintfort':
    [{
      id: 8956393,
      name: 'expert Kamp-Lintfort',
      city: 'Kamp-Lintfort'
    }],
  'Techno-Land': [{ id: 20575054, name: 'Techno-Land', city: 'Deizisau' }],
  'expert Oehler':
    [{ id: 2066675, name: 'expert Oehler', city: 'Kehl' },
    { id: 1907154, name: 'expert Oehler', city: 'Offenburg' }],
  'expert Höxter': [{ id: 1907443, name: 'expert Höxter', city: 'Höxter' }],
  'expert Gotha': [{ id: 31952341, name: 'expert Gotha', city: 'Gotha' }],
  'expert Schlagenhauf':
    [{
      id: 1907536,
      name: 'expert Schlagenhauf',
      city: 'Feuchtwangen'
    },
    { id: 1906983, name: 'expert Schlagenhauf', city: 'Ellwangen' },
    { id: 1907470, name: 'expert Schlagenhauf', city: 'Aalen' },
    {
      id: 2426079,
      name: 'expert Schlagenhauf',
      city: 'Gunzenhausen'
    },
    { id: 15090077, name: 'expert Schlagenhauf', city: 'Weißenburg' }],
  'expert Bamberg': [{ id: 21476262, name: 'expert Bamberg', city: 'Hallstadt' }],
  'expert im famila': [{ id: 12345111, name: 'expert im famila', city: 'Bielefeld' }],
  'expert Höchstadt': [{ id: 27284126, name: 'expert Höchstadt', city: 'Höchstadt' }],
  'expert Demirbas': [{ id: 28713528, name: 'expert Demirbas', city: 'Wesel' }],
  'K + B expert Ilmenau': [{ id: 1906866, name: 'K + B expert Ilmenau', city: 'Ilmenau' }],
  'expert Holzminden': [{ id: 1907156, name: 'expert Holzminden', city: 'Holzminden' }],
  'expert Haug': [{ id: 1906921, name: 'expert Haug', city: 'Freudenstadt' }],
  'expert Lichtenfels': [{ id: 21476261, name: 'expert Lichtenfels', city: 'Lichtenfels' }],
  'expert Teichert':
    [{ id: 1907303, name: 'expert Teichert', city: 'Northeim' },
    { id: 1907179, name: 'expert Teichert', city: 'Osterode' }],
  'expert Borken': [{ id: 24993632, name: 'expert Borken', city: 'Borken' }],
  'expert Xanten': [{ id: 24135176, name: 'expert Xanten', city: 'Xanten' }],
  'expert Ruoff': [{ id: 1907127, name: 'expert Ruoff', city: 'Metzingen' }],
  'expert Coesfeld': [{ id: 1907301, name: 'expert Coesfeld', city: 'Coesfeld' }],
  'expert Döring':
    [{ id: 14756052, name: 'expert Döring', city: 'Bad Salzuflen' },
    { id: 15305380, name: 'expert Döring', city: 'Herford' },
    { id: 1907073, name: 'expert Döring', city: 'Löhne' },
    { id: 1906846, name: 'expert Döring', city: 'Lübbecke' }],
  'expert Riedel & Neumann':
    [{
      id: 30584101,
      name: 'expert Riedel & Neumann',
      city: 'Einbeck'
    },
    { id: 2266385, name: 'expert Riedel & Neumann', city: 'Seesen' },
    { id: 1907043, name: 'expert Riedel & Neumann', city: 'Goslar' },
    {
      id: 21578520,
      name: 'expert Riedel & Neumann',
      city: 'Blankenburg'
    }],
  'expert Forchheim': [{ id: 2268071, name: 'expert Forchheim', city: 'Forchheim' }],
  'expert Media-Park':
    [{ id: 12585539, name: 'expert Media-Park', city: 'Greven' },
    { id: 1906858, name: 'expert Media-Park', city: 'Emsdetten' }],
  'expert Fürth': [{ id: 33407562, name: 'expert Fürth', city: 'Fürth' }],
  'expert TeVi':
    [{ id: 1907418, name: 'expert TeVi', city: 'Nürnberg' },
    { id: 1907313, name: 'expert TeVi', city: 'Nürnberg' },
    { id: 1906881, name: 'expert TeVi', city: 'Schwabach' },
    { id: 1907032, name: 'expert TeVi', city: 'Neumarkt' },
    { id: 1907071, name: 'expert TeVi', city: 'Landshut' },
    { id: 1906876, name: 'expert TeVi', city: 'Deggendorf' },
    { id: 1906836, name: 'expert TeVi', city: 'Neuötting' },
    { id: 1907199, name: 'expert TeVi', city: 'Passau' }],
  'expert Kronach': [{ id: 21476263, name: 'expert Kronach', city: 'Kronach' }],
  'expert Elektroland': [{ id: 1907423, name: 'expert Elektroland', city: 'Heidenheim' }],
  'expert Melle': [{ id: 1907483, name: 'expert Melle', city: 'Melle' }],
  'expert Bünde': [{ id: 1907058, name: 'expert Bünde', city: 'Bünde' }],
  'expert Rinteln': [{ id: 1907457, name: 'expert Rinteln', city: 'Rinteln' }],
  'expert Media-Park ': [{ id: 1907323, name: 'expert Media-Park ', city: 'Steinfurt' }],
  'expert Ahaus': [{ id: 1907097, name: 'expert Ahaus', city: 'Ahaus' }],
  'expert Espelage': [{ id: 1907171, name: 'expert Espelage', city: 'Alfeld' }],
  'expert Müller Nördlingen':
    [{
      id: 1907256,
      name: 'expert Müller Nördlingen',
      city: 'Nördlingen'
    }],
  'K + B expert Rudolstadt':
    [{
      id: 2739092,
      name: 'K + B expert Rudolstadt',
      city: 'Rudolstadt'
    }],
  'expert Rial-Kauf':
    [{ id: 7841751, name: 'expert Rial-Kauf', city: 'Ibbenbüren' },
    { id: 1907245, name: 'expert Rial-Kauf', city: 'Lingen' }],
  'expert Ochtrup': [{ id: 1906905, name: 'expert Ochtrup', city: 'Ochtrup' }],
  'expert Enderer': [{ id: 1907532, name: 'expert Enderer', city: 'Zimmern o. R.' }],
  'expert HERBA electronic': [{ id: 1906988, name: 'expert HERBA electronic', city: 'Gronau' }],
  'expert Springe': [{ id: 2214116, name: 'expert Springe', city: 'Springe' }],
  'expert Stadthagen': [{ id: 1907092, name: 'expert Stadthagen', city: 'Stadthagen' }],
  'expert Jakob ': [{ id: 25401148, name: 'expert Jakob ', city: 'Bayreuth' }],
  'expert Apel + Eberitsch': [{ id: 1906941, name: 'expert Apel + Eberitsch', city: 'Pößneck' }],
  'expert Ehingen': [{ id: 27509128, name: 'expert Ehingen', city: 'Ehingen (Donau)' }],
  'expert de Witte': [{ id: 1906925, name: 'expert de Witte', city: 'Schüttorf' }],
  'expert Dillingen':
    [{
      id: 1906954,
      name: 'expert Dillingen',
      city: 'Dillingen an der Donau'
    }],
  'expert Günzburg': [{ id: 1907162, name: 'expert Günzburg', city: 'Günzburg' }],
  'expert Arndt':
    [{ id: 32103156, name: 'expert Arndt', city: 'Donauwörth' },
    { id: 32110782, name: 'expert Arndt', city: 'Eichstätt' }],
  'expert Sigmaringen': [{ id: 2268075, name: 'expert Sigmaringen', city: 'Sigmaringen' }],
  'expert Münchberg': [{ id: 1907281, name: 'expert Münchberg', city: 'Münchberg' }],
  'expert Schaper': [{ id: 28756292, name: 'expert Schaper', city: 'Damme' }],
  'expert Laatzen': [{ id: 2734533, name: 'expert Laatzen', city: 'Laatzen' }],
  'expert Wunstorf': [{ id: 1907229, name: 'expert Wunstorf', city: 'Wunstorf' }],
  'expert Nordhorn': [{ id: 22326563, name: 'expert Nordhorn', city: 'Nordhorn' }],
  'expert Salzgitter': [{ id: 2268081, name: 'expert Salzgitter', city: 'Salzgitter' }],
  'expert Hof': [{ id: 25401149, name: 'expert Hof', city: 'Hof' }],
  'expert Garbsen': [{ id: 18271100, name: 'expert Garbsen', city: 'Garbsen' }],
  'expert Bad Saulgau': [{ id: 2150035, name: 'expert Bad Saulgau', city: 'Bad Saulgau' }],
  'expert Langenhagen': [{ id: 2739145, name: 'expert Langenhagen', city: 'Langenhagen' }],
  'expert Wolfenbüttel':
    [{
      id: 12609536,
      name: 'expert Wolfenbüttel',
      city: 'Wolfenbüttel'
    }],
  'expert Lehrte': [{ id: 1906845, name: 'expert Lehrte', city: 'Lehrte' }],
  'expert Neustadt':
    [{
      id: 16149994,
      name: 'expert Neustadt',
      city: 'Neustadt a. Rbge.'
    }],
  'expert HELO': [{ id: 1907285, name: 'expert HELO', city: 'Neuburg/Donau' }],
  'K + B expert Amberg': [{ id: 1907176, name: 'K + B expert Amberg', city: 'Amberg' }],
  'expert Burgdorf': [{ id: 1907286, name: 'expert Burgdorf', city: 'Burgdorf' }],
  'expert Nienburg': [{ id: 1907011, name: 'expert Nienburg', city: 'Nienburg' }],
  'expert Keßler': [{ id: 33858322, name: 'expert Keßler', city: 'Bad Waldsee' }],
  'expert Überlingen': [{ id: 2144945, name: 'expert Überlingen', city: 'Überlingen' }],
  'expert Weißenfels': [{ id: 33961709, name: 'expert Weißenfels', city: 'Weißenfels' }],
  'expert Jäger':
    [{
      id: 26799835,
      name: 'expert Jäger',
      city: 'Kretzschau OT Grana'
    },
    { id: 1907497, name: 'expert Jäger', city: 'Altenburg' }],
  'expert Schrobenhausen':
    [{
      id: 1907100,
      name: 'expert Schrobenhausen',
      city: 'Schrobenhausen'
    }],
  'expert Müller Reichenbach':
    [{
      id: 1907214,
      name: 'expert Müller Reichenbach',
      city: 'Reichenbach'
    }],
  'expert Villringer':
    [{ id: 26802905, name: 'expert Villringer', city: 'Schopfheim' },
    { id: 1907438, name: 'expert Villringer', city: 'Lörrach' },
    {
      id: 14756041,
      name: 'expert Villringer',
      city: 'Bad Säckingen'
    }],
  'expert BOmedia': [{ id: 1907343, name: 'expert BOmedia', city: 'Haren' }],
  'expert Kohne': [{ id: 29514128, name: 'expert Kohne', city: 'Werlte' }],
  'expert Gifhorn': [{ id: 13068220, name: 'expert Gifhorn', city: 'Gifhorn' }],
  'Kohne/Sögel': [{ id: 31293000, name: 'Kohne/Sögel', city: 'Sögel' }],
  'expert Celle': [{ id: 26647453, name: 'expert Celle', city: 'Celle' }],
  'expert Halle': [{ id: 33961708, name: 'expert Halle', city: 'Halle' }],
  'K + B expert Schwandorf':
    [{
      id: 1906936,
      name: 'K + B expert Schwandorf',
      city: 'Schwandorf'
    }],
  'expert Reng':
    [{ id: 1907380, name: 'expert Reng', city: 'Neustadt' },
    { id: 1907123, name: 'expert Reng', city: 'Kelheim' }],
  'expert Pfaffenhofen':
    [{
      id: 1907159,
      name: 'expert Pfaffenhofen',
      city: 'Pfaffenhofen'
    }],
  'expert Wangen': [{ id: 2268070, name: 'expert Wangen', city: 'Wangen' }],
  'expert Leipzig': [{ id: 22865535, name: 'expert Leipzig', city: 'Leipzig' }],
  Dodenhof: [{ id: 2737312, name: 'Dodenhof', city: 'Posthausen' }],
  'expert Soltau': [{ id: 1907371, name: 'expert Soltau', city: 'Soltau' }],
  'expert Marktoberdorf':
    [{
      id: 1907577,
      name: 'expert Marktoberdorf',
      city: 'Marktoberdorf'
    }],
  'expert Kohle': [{ id: 1907349, name: 'expert Kohle', city: 'Bremen/Borgfeld' }],
  'expert Rotenburg': [{ id: 1907359, name: 'expert Rotenburg', city: 'Rotenburg' }],
  'expert Pirna':
    [{ id: 31343294, name: 'expert Pirna', city: 'Chemnitz' },
    { id: 26051723, name: 'expert Pirna', city: 'Freital' },
    { id: 26051722, name: 'expert Pirna', city: 'Pirna' },
    { id: 31315790, name: 'expert Pirna', city: 'Sebnitz' },
    { id: 32110783, name: 'expert Pirna', city: 'Lübbenau' }],
  'expert Sonthofen': [{ id: 1907243, name: 'expert Sonthofen', city: 'Sonthofen' }],
  'K + B expert Cham': [{ id: 1907351, name: 'K + B expert Cham', city: 'Cham' }],
  'expert Fiedler':
    [{
      id: 1907589,
      name: 'expert Fiedler',
      city: 'Annaberg-Buchholz'
    }],
  'expert Uelzen': [{ id: 13068215, name: 'expert Uelzen', city: 'Uelzen' }],
  'expert Brake': [{ id: 24686946, name: 'expert Brake', city: 'Brake' }],
  'expert Füssen': [{ id: 1906839, name: 'expert Füssen', city: 'Füssen' }],
  'expert Straubing': [{ id: 2237090, name: 'expert Straubing', city: 'Straubing' }],
  'K + B expert Kötzting':
    [{
      id: 1907117,
      name: 'K + B expert Kötzting',
      city: 'Bad Kötzting'
    }],
  'expert Salzwedel': [{ id: 25910829, name: 'expert Salzwedel', city: 'Salzwedel' }],
  'expert Dingolfing': [{ id: 1907172, name: 'expert Dingolfing', city: 'Dingolfing' }],
  'expert Wittenberg':
    [{
      id: 22865534,
      name: 'expert Wittenberg',
      city: 'Lutherstadt Wittenberg'
    }],
  'expert Wunder': [{ id: 1907322, name: 'expert Wunder', city: 'Oschatz' }],
  'expert Elektro Center Torgau':
    [{
      id: 1907296,
      name: 'expert Elektro Center Torgau',
      city: 'Torgau'
    }],
  'expert Holzkirchen': [{ id: 2268016, name: 'expert Holzkirchen', city: 'Holzkirchen' }],
  'expert Nordenham': [{ id: 22820487, name: 'expert Nordenham', city: 'Nordenham' }],
  'expert rfe - elektro union':
    [{
      id: 13193164,
      name: 'expert rfe - elektro union',
      city: 'Freiberg'
    }],
  'expert Lüneburg': [{ id: 30481005, name: 'expert Lüneburg', city: 'Lüneburg' }],
  'expert Bloedorn': [{ id: 1907155, name: 'expert Bloedorn', city: 'Winsen' }],
  'expert Plattling': [{ id: 1907299, name: 'expert Plattling', city: 'Plattling' }],
  'expert Zeiller': [{ id: 1907476, name: 'expert Zeiller', city: 'Waldkraiburg' }],
  'K + B expert Regen': [{ id: 1906960, name: 'K + B expert Regen', city: 'Regen' }],
  'expert Geesthacht': [{ id: 2469251, name: 'expert Geesthacht', city: 'Geesthacht' }],
  'expert Otto': [{ id: 14418634, name: 'expert Otto', city: 'Rathenow ' }],
  'expert Thomas-Electronic':
    [{
      id: 1907267,
      name: 'expert Thomas-Electronic',
      city: 'Hamburg/Osdorf'
    }],
  'expert Brandenburg':
    [{
      id: 22865531,
      name: 'expert Brandenburg',
      city: 'Brandenburg an der Havel'
    }],
  'expert Pötzsch':
    [{ id: 1906928, name: 'expert Pötzsch', city: 'Gröditz' },
    { id: 1907013, name: 'expert Pötzsch', city: 'Bad Liebenwerda' },
    { id: 1907041, name: 'expert Pötzsch', city: 'Elsterwerda' },
    { id: 1907362, name: 'expert Pötzsch', city: 'Finsterwalde' },
    { id: 26276154, name: 'expert Pötzsch', city: 'Senftenberg' }],
  'expert Wittenberge': [{ id: 25910830, name: 'expert Wittenberge', city: 'Wittenberge' }],
  'expert Tilly': [{ id: 1907221, name: 'expert Tilly', city: 'Hamburg/Niendorf' }],
  'expert THEINER':
    [{ id: 1907034, name: 'expert THEINER', city: 'Pfarrkirchen' },
    { id: 1906875, name: 'expert THEINER', city: 'Vilshofen' },
    { id: 1907429, name: 'expert THEINER', city: 'Pocking' }],
  'expert Meiners': [{ id: 1907174, name: 'expert Meiners', city: 'Glückstadt' }],
  'expert Traunreut ': [{ id: 1907060, name: 'expert Traunreut ', city: 'Traunreut' }],
  'expert Elektro-Alster-Nord':
    [{
      id: 1907334,
      name: 'expert Elektro-Alster-Nord',
      city: 'Norderstedt'
    }],
  'expert Brunsbüttel': [{ id: 2673978, name: 'expert Brunsbüttel', city: 'Brunsbüttel' }],
  'K + B expert Waldkirchen':
    [{
      id: 1907187,
      name: 'K + B expert Waldkirchen',
      city: 'Waldkirchen'
    }],
  'expert MegaLand Bad Oldesloe':
    [{
      id: 1907361,
      name: 'expert MegaLand Bad Oldesloe',
      city: 'Bad Oldesloe'
    }],
  ESC:
    [{ id: 32472581, name: 'ESC', city: 'Rangsdorf' },
    { id: 25254886, name: 'ESC', city: 'Bischofswerda' },
    {
      id: 32410034,
      name: 'ESC',
      city: 'Königs Wusterhausen/OT Zeesen'
    },
    { id: 1907363, name: 'ESC', city: 'Hoyerswerda' },
    { id: 25254885, name: 'ESC', city: 'Bautzen' },
    { id: 18751463, name: 'ESC', city: 'Cottbus' },
    { id: 32472580, name: 'ESC', city: 'Fürstenwalde' },
    { id: 1906849, name: 'ESC', city: 'Görlitz' }],
  'expert Schwerin': [{ id: 20664204, name: 'expert Schwerin', city: 'Schwerin' }],
  'expert Bild und Ton': [{ id: 1907439, name: 'expert Bild und Ton', city: 'Neuruppin' }],
  'expert MegaLand Bad Segeberg':
    [{
      id: 1907201,
      name: 'expert MegaLand Bad Segeberg',
      city: 'Bad Segeberg'
    }],
  'expert Nord':
    [{ id: 1906130, name: 'expert Nord', city: 'Neumünster' },
    { id: 15747859, name: 'expert Nord', city: 'Wismar' },
    { id: 7112105, name: 'expert Nord', city: 'Neustadt' },
    { id: 15747852, name: 'expert Nord', city: 'Neubrandenburg' },
    { id: 15747853, name: 'expert Nord', city: 'Neuenkirchen' }],
  'expert Heide': [{ id: 1907453, name: 'expert Heide', city: 'Heide' }],
  'expert Ebersbach':
    [{
      id: 2917802,
      name: 'expert Ebersbach',
      city: 'Ebersbach-Neugersdorf'
    }],
  'expert MegaLand Eutin': [{ id: 1906965, name: 'expert MegaLand Eutin', city: 'Eutin' }],
  'expert Oberlausitz':
    [{ id: 19972181, name: 'expert Oberlausitz', city: 'Weißwasser' },
    { id: 19972180, name: 'expert Oberlausitz', city: 'Niesky' }],
  'expert Husum': [{ id: 1907049, name: 'expert Husum', city: 'Husum' }],
  'expert Jöhnk': [{ id: 13068209, name: 'expert Jöhnk', city: 'Eckernförde' }],
  'expert MegaLand Schleswig':
    [{
      id: 1907259,
      name: 'expert MegaLand Schleswig',
      city: 'Schleswig'
    }],
  'expert Boetius': [{ id: 1907489, name: 'expert Boetius', city: 'Wyk/Föhr' }],
  'expert Flensburg': [{ id: 20664203, name: 'expert Flensburg', city: 'Flensburg' }],
  'expert Grützmann': [{ id: 1907524, name: 'expert Grützmann', city: 'Anklam' }]
}

