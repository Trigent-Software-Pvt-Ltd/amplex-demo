import type {
  InventoryItem,
  Order,
  ShippedOrder,
  CancelledOrder,
  OrderChange,
  InboundPO,
  ReceivedPO,
  KittingWO,
  BundlingWO,
  BOM,
  Return,
  PreviousOrder,
  AllocatedInventory,
  BackOrder,
} from "./types";

// ---------------------------------------------------------------------------
// INVENTORY
// ---------------------------------------------------------------------------

export const INVENTORY: InventoryItem[] = [
  {
    sku: "SGM-STD-001",
    name: "Simple Mobile Handset – Standard",
    description: "Entry-tier prepaid handset — Simple Mobile-branded retail SKU",
    available: 10820,
    allocated: 1440,
    quarantined: 0,
    reorderPoint: 3000,
    location: "Bay A3-12",
    status: "healthy",
  },
  {
    sku: "SGM-PRM-001",
    name: "TracFone Handset – Premium",
    description: "Premium-tier prepaid handset — TracFone-branded retail SKU",
    available: 2100,
    allocated: 240,
    quarantined: 0,
    reorderPoint: 2500,
    location: "Bay B1-04",
    status: "low",
  },
  {
    sku: "SGM-ACC-KIT",
    name: "Accessories Kit",
    description: "Universal accessories bundle — charger, case, screen protector",
    available: 660,
    allocated: 0,
    quarantined: 240,
    reorderPoint: 1500,
    location: "Bay C2-08",
    status: "critical",
    holdReason:
      "Damage detected on inbound receipt — lab inspection pending",
    estRelease: "Mar 28, 2026",
  },
];

// ---------------------------------------------------------------------------
// OPEN ORDERS
// ---------------------------------------------------------------------------

export const OPEN_ORDERS: Order[] = [
  {
    id: "ORD-2026-2241",
    poNumber: "PO-WM-88401",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qty: 480,
    destination: "DC #6057",
    orderDate: "Mar 20, 2026",
    shipBy: "Mar 27, 2026",
    status: "back-order",
    shortBy: 120,
    resolutionEta: "Mar 28, 2026",
    resolutionPo: "PO-0481",
  },
  {
    id: "ORD-2026-2242",
    poNumber: "PO-WM-88402",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qty: 960,
    destination: "DC #6057",
    orderDate: "Mar 21, 2026",
    shipBy: "Mar 29, 2026",
    status: "allocated",
  },
  {
    id: "ORD-2026-2243",
    poNumber: "PO-WM-88403",
    sku: "SGM-PRM-001",
    skuName: "TracFone Handset – Premium",
    qty: 480,
    destination: "Store #9032",
    orderDate: "Mar 22, 2026",
    shipBy: "Mar 31, 2026",
    status: "picking",
  },
  {
    id: "ORD-2026-2244",
    poNumber: "PO-WM-88404",
    sku: "SGM-PRM-001",
    skuName: "TracFone Handset – Premium",
    qty: 240,
    destination: "Store #4421",
    orderDate: "Apr 1, 2026",
    shipBy: "Apr 1, 2026",
    status: "queued",
  },
];

// ---------------------------------------------------------------------------
// BACK ORDERS
// ---------------------------------------------------------------------------

export const BACK_ORDERS: BackOrder[] = [
  {
    orderId: "ORD-2026-2241",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qtyOrdered: 480,
    qtyAvailable: 360,
    shortBy: 120,
    resolutionEta: "Mar 28, 2026",
    resolutionPo: "PO-0481",
  },
  {
    orderId: "ORD-2026-2245",
    sku: "SGM-ACC-KIT",
    skuName: "Accessories Kit",
    qtyOrdered: 360,
    qtyAvailable: 240,
    shortBy: 120,
    resolutionEta: "Apr 1, 2026",
    resolutionPo: "PO-0476",
  },
];

// ---------------------------------------------------------------------------
// SHIPPED ORDERS
// ---------------------------------------------------------------------------

export const SHIPPED_ORDERS: ShippedOrder[] = [
  {
    id: "SHP-4821",
    orderId: "ORD-2026-2230",
    poNumber: "PO-WM-88390",
    sku: "SGM-STD-001",
    qty: 960,
    carrier: "Old Dominion",
    shippedDate: "Mar 10, 2026",
    deliveredDate: "Mar 14, 2026",
    otif: "on-time",
  },
  {
    id: "SHP-4815",
    orderId: "ORD-2026-2228",
    poNumber: "PO-WM-88388",
    sku: "SGM-STD-001",
    qty: 480,
    carrier: "FedEx",
    shippedDate: "Mar 8, 2026",
    deliveredDate: "Mar 12, 2026",
    otif: "on-time",
  },
  {
    id: "SHP-4810",
    orderId: "ORD-2026-2225",
    poNumber: "PO-WM-88385",
    sku: "SGM-PRM-001",
    qty: 240,
    carrier: "Old Dominion",
    shippedDate: "Mar 5, 2026",
    deliveredDate: "Mar 10, 2026",
    otif: "late",
    lateReason: "Weather delay — ice storm in DFW (+1 day)",
  },
  {
    id: "SHP-4802",
    orderId: "ORD-2026-2220",
    poNumber: "PO-WM-88380",
    sku: "SGM-ACC-KIT",
    qty: 360,
    carrier: "FedEx",
    shippedDate: "Mar 3, 2026",
    deliveredDate: "Mar 6, 2026",
    otif: "on-time",
  },
  {
    id: "SHP-4795",
    orderId: "ORD-2026-2238",
    poNumber: "PO-WM-88398",
    sku: "SGM-STD-001",
    qty: 720,
    carrier: "Old Dominion",
    shippedDate: "Mar 18, 2026",
    deliveredDate: null,
    eta: "Mar 23, 2026",
    otif: "in-transit",
  },
];

// ---------------------------------------------------------------------------
// CANCELLED ORDERS
// ---------------------------------------------------------------------------

export const CANCELLED_ORDERS: CancelledOrder[] = [
  {
    id: "ORD-2026-2215",
    poNumber: "PO-WM-88375",
    sku: "SGM-STD-001",
    qty: 480,
    cancelDate: "Mar 2, 2026",
    reason: "Customer request — demand forecast revised",
  },
  {
    id: "ORD-2026-2218",
    poNumber: "PO-WM-88378",
    sku: "SGM-PRM-001",
    qty: 120,
    cancelDate: "Mar 6, 2026",
    reason: "Duplicate order — submitted twice by EDI",
  },
  {
    id: "ORD-2026-2222",
    poNumber: "PO-WM-88382",
    sku: "SGM-ACC-KIT",
    qty: 240,
    cancelDate: "Mar 12, 2026",
    reason: "Pricing dispute — awaiting revised PO",
  },
];

// ---------------------------------------------------------------------------
// ORDER CHANGES
// ---------------------------------------------------------------------------

export const ORDER_CHANGES: OrderChange[] = [
  {
    id: "CHG-0061",
    orderId: "ORD-2026-2242",
    changeType: "Ship-to change",
    from: "DC #6057",
    to: "Store #4421",
    requestedDate: "Mar 24, 2026",
    status: "pending",
  },
  {
    id: "CHG-0062",
    orderId: "ORD-2026-2244",
    changeType: "Quantity change",
    from: "240",
    to: "360",
    requestedDate: "Mar 25, 2026",
    status: "pending",
  },
];

// ---------------------------------------------------------------------------
// INBOUND PURCHASE ORDERS
// ---------------------------------------------------------------------------

export const INBOUND_POS: InboundPO[] = [
  {
    id: "PO-0481",
    supplier: "Sigma Electronics (Shenzhen)",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qtyOrdered: 2400,
    expectedDate: "Mar 28, 2026",
    status: "in-transit",
    progress: 75,
  },
  {
    id: "PO-0479",
    supplier: "Sigma Electronics (Shenzhen)",
    sku: "SGM-PRM-001",
    skuName: "TracFone Handset – Premium",
    qtyOrdered: 1200,
    expectedDate: "Mar 29, 2026",
    status: "in-transit",
    progress: 60,
  },
  {
    id: "PO-0476",
    supplier: "UniAccessory Co. (Dongguan)",
    sku: "SGM-ACC-KIT",
    skuName: "Accessories Kit",
    qtyOrdered: 600,
    expectedDate: "Apr 1, 2026",
    status: "customs",
    progress: 30,
  },
  {
    id: "PO-0482",
    supplier: "Sigma Electronics (Shenzhen)",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qtyOrdered: 2000,
    expectedDate: "Mar 30, 2026",
    status: "critical",
    progress: 15,
  },
];

// ---------------------------------------------------------------------------
// RECEIVED PURCHASE ORDERS
// ---------------------------------------------------------------------------

export const RECEIVED_POS: ReceivedPO[] = [
  {
    id: "PO-0470",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qtyOrdered: 2400,
    qtyReceived: 2400,
    receivedDate: "Mar 5, 2026",
    variance: 0,
  },
  {
    id: "PO-0468",
    sku: "SGM-PRM-001",
    skuName: "TracFone Handset – Premium",
    qtyOrdered: 1200,
    qtyReceived: 1200,
    receivedDate: "Mar 3, 2026",
    variance: 0,
  },
  {
    id: "PO-0465",
    sku: "SGM-ACC-KIT",
    skuName: "Accessories Kit",
    qtyOrdered: 600,
    qtyReceived: 595,
    receivedDate: "Feb 28, 2026",
    variance: -5,
  },
  {
    id: "PO-0472",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qtyOrdered: 1800,
    qtyReceived: 1800,
    receivedDate: "Mar 10, 2026",
    variance: 0,
  },
  {
    id: "PO-0474",
    sku: "SGM-PRM-001",
    skuName: "TracFone Handset – Premium",
    qtyOrdered: 960,
    qtyReceived: 960,
    receivedDate: "Mar 14, 2026",
    variance: 0,
  },
];

// ---------------------------------------------------------------------------
// KITTING — OPEN WORK ORDERS
// ---------------------------------------------------------------------------

export const KITTING_OPEN: KittingWO[] = [
  {
    id: "KIT-0041",
    kitSku: "SGM-STD-001",
    description: "Standard Handset Kit Assembly",
    qty: 960,
    started: "Mar 18, 2026",
    dueDate: "Apr 2, 2026",
    progress: 65,
    status: "on-track",
  },
  {
    id: "KIT-0042",
    kitSku: "SGM-PRM-001",
    description: "Premium Handset Kit Assembly",
    qty: 480,
    started: "Mar 20, 2026",
    dueDate: "Apr 4, 2026",
    progress: 40,
    status: "in-progress",
  },
  {
    id: "KIT-0043",
    kitSku: "PROMO-Q2",
    description: "Q2 Promotional Kit Assembly",
    qty: 1200,
    started: "Mar 25, 2026",
    dueDate: "Mar 31, 2026",
    progress: 10,
    status: "at-risk",
  },
];

// ---------------------------------------------------------------------------
// KITTING — COMPLETED WORK ORDERS
// ---------------------------------------------------------------------------

export const KITTING_DONE: KittingWO[] = [
  {
    id: "KIT-0038",
    kitSku: "SGM-STD-001",
    description: "Standard Handset Kit Assembly",
    qty: 1440,
    started: "Mar 3, 2026",
    dueDate: "Mar 10, 2026",
    progress: 100,
    status: "completed",
    accuracy: 99.8,
    disposition: "Released to inventory",
  },
  {
    id: "KIT-0039",
    kitSku: "SGM-PRM-001",
    description: "Premium Handset Kit Assembly",
    qty: 720,
    started: "Mar 5, 2026",
    dueDate: "Mar 12, 2026",
    progress: 100,
    status: "completed",
    accuracy: 100,
    disposition: "Released to inventory",
  },
  {
    id: "KIT-0040",
    kitSku: "SGM-ACC-KIT",
    description: "Accessories Kit Assembly",
    qty: 600,
    started: "Mar 8, 2026",
    dueDate: "Mar 15, 2026",
    progress: 100,
    status: "completed",
    accuracy: 98.5,
    disposition: "Released to inventory — 9 units reworked",
  },
  {
    id: "KIT-0037",
    kitSku: "SGM-STD-001",
    description: "Standard Handset Kit Assembly",
    qty: 960,
    started: "Feb 24, 2026",
    dueDate: "Mar 3, 2026",
    progress: 100,
    status: "completed",
    accuracy: 99.6,
    disposition: "Released to inventory",
  },
];

// ---------------------------------------------------------------------------
// BUNDLING — OPEN WORK ORDERS
// ---------------------------------------------------------------------------

export const BUNDLING_OPEN: BundlingWO[] = [
  {
    id: "BDL-0091",
    bundleSku: "BDL-WM-STD-6PK",
    description: "Walmart Standard 6-Pack Shipper",
    qty: 160,
    started: "Mar 19, 2026",
    dueDate: "Mar 28, 2026",
    progress: 70,
    status: "on-track",
  },
  {
    id: "BDL-0092",
    bundleSku: "BDL-WM-PRM-4PK",
    description: "Walmart Premium 4-Pack Shipper",
    qty: 120,
    started: "Mar 20, 2026",
    dueDate: "Mar 30, 2026",
    progress: 50,
    status: "in-progress",
  },
  {
    id: "BDL-0093",
    bundleSku: "BDL-WM-PROMO-Q2",
    description: "Walmart Q2 Promo Display Bundle",
    qty: 200,
    started: "Mar 22, 2026",
    dueDate: "Apr 1, 2026",
    progress: 25,
    status: "in-progress",
  },
  {
    id: "BDL-0094",
    bundleSku: "BDL-TW-STD-12PK",
    description: "TotalWireless Standard 12-Pack Case",
    qty: 80,
    started: "Mar 24, 2026",
    dueDate: "Apr 3, 2026",
    progress: 15,
    status: "on-track",
  },
  {
    id: "BDL-0095",
    bundleSku: "BDL-SM-ACC-8PK",
    description: "Simple Mobile Accessories 8-Pack",
    qty: 100,
    started: "Mar 25, 2026",
    dueDate: "Apr 5, 2026",
    progress: 5,
    status: "at-risk",
  },
];

// ---------------------------------------------------------------------------
// BUNDLING — COMPLETED WORK ORDERS
// ---------------------------------------------------------------------------

export const BUNDLING_DONE: BundlingWO[] = [
  {
    id: "BDL-0087",
    bundleSku: "BDL-WM-STD-6PK",
    description: "Walmart Standard 6-Pack Shipper",
    qty: 200,
    started: "Mar 3, 2026",
    dueDate: "Mar 10, 2026",
    progress: 100,
    status: "completed",
    laborHours: 48,
    output: 200,
  },
  {
    id: "BDL-0088",
    bundleSku: "BDL-WM-PRM-4PK",
    description: "Walmart Premium 4-Pack Shipper",
    qty: 150,
    started: "Mar 5, 2026",
    dueDate: "Mar 12, 2026",
    progress: 100,
    status: "completed",
    laborHours: 42,
    output: 150,
  },
  {
    id: "BDL-0089",
    bundleSku: "BDL-TW-STD-12PK",
    description: "TotalWireless Standard 12-Pack Case",
    qty: 60,
    started: "Mar 8, 2026",
    dueDate: "Mar 14, 2026",
    progress: 100,
    status: "completed",
    laborHours: 22,
    output: 60,
  },
  {
    id: "BDL-0090",
    bundleSku: "BDL-SM-ACC-8PK",
    description: "Simple Mobile Accessories 8-Pack",
    qty: 120,
    started: "Mar 10, 2026",
    dueDate: "Mar 17, 2026",
    progress: 100,
    status: "completed",
    laborHours: 36,
    output: 118,
  },
];

// ---------------------------------------------------------------------------
// BILLS OF MATERIALS
// ---------------------------------------------------------------------------

export const BOMS: BOM[] = [
  {
    kitSku: "SGM-STD-001",
    kitName: "Standard Handset Kit",
    components: [
      {
        component: "Handset Body",
        sku: "CMP-HB-001",
        qtyPerKit: 1,
        scanRequired: true,
      },
      {
        component: "Battery",
        sku: "CMP-BAT-001",
        qtyPerKit: 1,
        scanRequired: true,
      },
      {
        component: "Battery Cover",
        sku: "CMP-BC-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "SIM Card",
        sku: "CMP-SIM-001",
        qtyPerKit: 1,
        scanRequired: true,
        pairingNote: "IMEI-to-ICCID pairing required at scan station",
      },
      {
        component: "Headset",
        sku: "CMP-HS-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Quick Start Guide",
        sku: "CMP-QSG-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Retail Box",
        sku: "CMP-RB-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
    ],
  },
  {
    kitSku: "SGM-PRM-001",
    kitName: "Premium Handset Kit",
    components: [
      {
        component: "Handset Body",
        sku: "CMP-HB-002",
        qtyPerKit: 1,
        scanRequired: true,
      },
      {
        component: "Battery",
        sku: "CMP-BAT-002",
        qtyPerKit: 1,
        scanRequired: true,
      },
      {
        component: "Battery Cover",
        sku: "CMP-BC-002",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "SIM Card",
        sku: "CMP-SIM-002",
        qtyPerKit: 1,
        scanRequired: true,
        pairingNote: "IMEI-to-ICCID pairing required at scan station",
      },
      {
        component: "Headset",
        sku: "CMP-HS-002",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Quick Start Guide",
        sku: "CMP-QSG-002",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Premium Case",
        sku: "CMP-PC-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Screen Protector",
        sku: "CMP-SP-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Extended Warranty Card",
        sku: "CMP-EWC-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Retail Box",
        sku: "CMP-RB-002",
        qtyPerKit: 1,
        scanRequired: false,
      },
    ],
  },
  {
    kitSku: "SGM-ACC-KIT",
    kitName: "Accessories Kit",
    components: [
      {
        component: "USB-C Charger",
        sku: "CMP-CHG-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Car Charger",
        sku: "CMP-CCH-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Clear Case",
        sku: "CMP-CC-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Tempered Glass Screen Protector",
        sku: "CMP-TG-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "User Manual",
        sku: "CMP-UM-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
    ],
  },
  {
    kitSku: "PROMO-Q2",
    kitName: "Q2 Promotional Kit",
    components: [
      {
        component: "Standard Handset Body",
        sku: "CMP-HB-001",
        qtyPerKit: 1,
        scanRequired: true,
      },
      {
        component: "Battery",
        sku: "CMP-BAT-001",
        qtyPerKit: 1,
        scanRequired: true,
      },
      {
        component: "Battery Cover",
        sku: "CMP-BC-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "SIM Card",
        sku: "CMP-SIM-001",
        qtyPerKit: 1,
        scanRequired: true,
        pairingNote: "IMEI-to-ICCID pairing required at scan station",
      },
      {
        component: "Premium Case",
        sku: "CMP-PC-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Screen Protector",
        sku: "CMP-SP-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "USB-C Charger",
        sku: "CMP-CHG-001",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Q2 Promo Insert Card",
        sku: "CMP-PIC-Q2",
        qtyPerKit: 1,
        scanRequired: false,
      },
      {
        component: "Promo Branded Box",
        sku: "CMP-PB-Q2",
        qtyPerKit: 1,
        scanRequired: false,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// RETURNS
// ---------------------------------------------------------------------------

export const RETURNS: Return[] = [
  {
    rmaNumber: "RMA-2026-0081",
    originalOrder: "ORD-2026-2190",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qty: 120,
    returnDate: "Mar 10, 2026",
    reason: "Overstock",
    condition: "sellable",
    disposition: "restocked",
  },
  {
    rmaNumber: "RMA-2026-0082",
    originalOrder: "ORD-2026-2195",
    sku: "SGM-PRM-001",
    skuName: "TracFone Handset – Premium",
    qty: 60,
    returnDate: "Mar 12, 2026",
    reason: "Damaged",
    condition: "damaged",
    disposition: "destroyed",
  },
  {
    rmaNumber: "RMA-2026-0083",
    originalOrder: "ORD-2026-2201",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qty: 30,
    returnDate: "Mar 14, 2026",
    reason: "Order Error",
    condition: "sellable",
    disposition: "restocked",
  },
  {
    rmaNumber: "RMA-2026-0084",
    originalOrder: "ORD-2026-2208",
    sku: "SGM-ACC-KIT",
    skuName: "Accessories Kit",
    qty: 90,
    returnDate: "Mar 17, 2026",
    reason: "Product Defect",
    condition: "defective",
    disposition: "destroyed",
  },
  {
    rmaNumber: "RMA-2026-0085",
    originalOrder: "ORD-2026-2212",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qty: 45,
    returnDate: "Mar 19, 2026",
    reason: "Overstock",
    condition: "sellable",
    disposition: "restocked",
  },
  {
    rmaNumber: "RMA-2026-0086",
    originalOrder: "ORD-2026-2216",
    sku: "SGM-PRM-001",
    skuName: "TracFone Handset – Premium",
    qty: 60,
    returnDate: "Mar 22, 2026",
    reason: "Damaged",
    condition: "damaged",
    disposition: "pending",
  },
];

// ---------------------------------------------------------------------------
// PREVIOUS ORDERS (for reorder page)
// ---------------------------------------------------------------------------

export const PREVIOUS_ORDERS: PreviousOrder[] = [
  {
    id: "ORD-2026-2230",
    date: "Mar 10, 2026",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qty: 960,
    total: "$43,200.00",
  },
  {
    id: "ORD-2026-2228",
    date: "Mar 8, 2026",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qty: 480,
    total: "$21,600.00",
  },
  {
    id: "ORD-2026-2225",
    date: "Mar 5, 2026",
    sku: "SGM-PRM-001",
    skuName: "TracFone Handset – Premium",
    qty: 240,
    total: "$16,800.00",
  },
  {
    id: "ORD-2026-2220",
    date: "Mar 3, 2026",
    sku: "SGM-ACC-KIT",
    skuName: "Accessories Kit",
    qty: 360,
    total: "$5,400.00",
  },
  {
    id: "ORD-2026-2210",
    date: "Feb 26, 2026",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qty: 1440,
    total: "$64,800.00",
  },
];

// ---------------------------------------------------------------------------
// ALLOCATED INVENTORY (by order)
// ---------------------------------------------------------------------------

export const ALLOCATED_INVENTORY: AllocatedInventory[] = [
  {
    orderId: "ORD-2026-2241",
    poNumber: "PO-WM-88401",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qtyAllocated: 360,
    allocatedDate: "Mar 20, 2026",
  },
  {
    orderId: "ORD-2026-2242",
    poNumber: "PO-WM-88402",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qtyAllocated: 960,
    allocatedDate: "Mar 21, 2026",
  },
  {
    orderId: "ORD-2026-2243",
    poNumber: "PO-WM-88403",
    sku: "SGM-PRM-001",
    skuName: "TracFone Handset – Premium",
    qtyAllocated: 480,
    allocatedDate: "Mar 22, 2026",
  },
  {
    orderId: "ORD-2026-2244",
    poNumber: "PO-WM-88404",
    sku: "SGM-PRM-001",
    skuName: "TracFone Handset – Premium",
    qtyAllocated: 240,
    allocatedDate: "Mar 23, 2026",
  },
  {
    orderId: "ORD-2026-2238",
    poNumber: "PO-WM-88398",
    sku: "SGM-STD-001",
    skuName: "Simple Mobile Handset – Standard",
    qtyAllocated: 720,
    allocatedDate: "Mar 18, 2026",
  },
  {
    orderId: "ORD-2026-2245",
    poNumber: "PO-WM-88405",
    sku: "SGM-ACC-KIT",
    skuName: "Accessories Kit",
    qtyAllocated: 240,
    allocatedDate: "Mar 24, 2026",
  },
];
