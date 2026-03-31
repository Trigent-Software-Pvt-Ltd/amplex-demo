export interface InventoryItem {
  sku: string;
  name: string;
  description: string;
  available: number;
  allocated: number;
  quarantined: number;
  reorderPoint: number;
  location: string;
  status: "healthy" | "low" | "critical";
  holdReason?: string;
  estRelease?: string;
}

export interface Order {
  id: string;
  poNumber: string;
  sku: string;
  skuName: string;
  qty: number;
  destination: string;
  orderDate: string;
  shipBy: string;
  status:
    | "picking"
    | "queued"
    | "allocated"
    | "back-order"
    | "shipped"
    | "cancelled";
  shortBy?: number;
  resolutionEta?: string;
  resolutionPo?: string;
}

export interface ShippedOrder {
  id: string;
  orderId: string;
  poNumber: string;
  sku: string;
  qty: number;
  carrier: string;
  shippedDate: string;
  deliveredDate: string | null;
  eta?: string;
  otif: "on-time" | "late" | "in-transit";
  lateReason?: string;
}

export interface CancelledOrder {
  id: string;
  poNumber: string;
  sku: string;
  qty: number;
  cancelDate: string;
  reason: string;
}

export interface OrderChange {
  id: string;
  orderId: string;
  changeType: string;
  from: string;
  to: string;
  requestedDate: string;
  status: "pending" | "accepted" | "rejected";
}

export interface InboundPO {
  id: string;
  supplier: string;
  sku: string;
  skuName: string;
  qtyOrdered: number;
  expectedDate: string;
  status: "in-transit" | "customs" | "received" | "critical";
  progress: number;
}

export interface ReceivedPO {
  id: string;
  sku: string;
  skuName: string;
  qtyOrdered: number;
  qtyReceived: number;
  receivedDate: string;
  variance: number;
}

export interface KittingWO {
  id: string;
  kitSku: string;
  description: string;
  qty: number;
  started: string;
  dueDate: string;
  progress: number;
  status: "in-progress" | "at-risk" | "on-track" | "completed";
  accuracy?: number;
  disposition?: string;
}

export interface BundlingWO {
  id: string;
  bundleSku: string;
  description: string;
  qty: number;
  started: string;
  dueDate: string;
  progress: number;
  status: "in-progress" | "at-risk" | "on-track" | "completed";
  laborHours?: number;
  output?: number;
}

export interface BOMComponent {
  component: string;
  sku: string;
  qtyPerKit: number;
  scanRequired: boolean;
  pairingNote?: string;
}

export interface BOM {
  kitSku: string;
  kitName: string;
  components: BOMComponent[];
}

export interface Return {
  rmaNumber: string;
  originalOrder: string;
  sku: string;
  skuName: string;
  qty: number;
  returnDate: string;
  reason: string;
  condition: "sellable" | "damaged" | "defective";
  disposition: "restocked" | "destroyed" | "pending";
}

export interface PreviousOrder {
  id: string;
  date: string;
  sku: string;
  skuName: string;
  qty: number;
  total: string;
}

export interface AllocatedInventory {
  orderId: string;
  poNumber: string;
  sku: string;
  skuName: string;
  qtyAllocated: number;
  allocatedDate: string;
}

export interface BackOrder {
  orderId: string;
  sku: string;
  skuName: string;
  qtyOrdered: number;
  qtyAvailable: number;
  shortBy: number;
  resolutionEta: string;
  resolutionPo: string;
}
