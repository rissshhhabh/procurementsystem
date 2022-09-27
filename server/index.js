const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "procurementsystem"
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/loginauth/:email/:password", (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  console.log(email, password);
  const sqlSelect = "SELECT * FROM users WHERE Email= ? AND Password= ?";
  db.query(sqlSelect, [email, password], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.post("/api/createpurchaserequisition", (req, res) => {
  const requestedby = req.body.requestedby;
  const requisitionid = req.body.requisitionid;
  const requesteddate = req.body.requesteddate;
  const expecteddate = req.body.expecteddate;
  const requisitionnumber = req.body.requisitionnumber;
  const managername = req.body.managername;
  const vendorname = req.body.vendorname;
  const status = "PENDING";
  const lastupdatedate = new Date().toLocaleDateString();
  const lastupdateby = new Date().toLocaleTimeString();
  const creationdate = new Date().toLocaleDateString();
  const message = "no messages yet !";

  console.log(
    requestedby,
    requesteddate,
    requisitionid,
    expecteddate,
    requisitionnumber,
    managername,
    vendorname
  );
  //console.log(finalid);
  const sqlInsert =
    "INSERT INTO procurementsystem.createpurchaserequisition (requested_by,requisition_id,requisition_number, requested_date, expected_date, managername, vendorname, status,message, last_update_date, last_updated_by, created_by,creation_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      requestedby,
      requisitionid,
      requisitionnumber,
      requesteddate,
      expecteddate,
      managername,
      vendorname,
      status,
      message,
      lastupdatedate,
      lastupdateby,
      requestedby,
      creationdate
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Requisition created successfully");
      }
    }
  );
});

app.post("/api/addrequisitionlines", (req, res) => {
  const requisition_id = req.body.requisition_id;
  const product = req.body.product;
  const unit_price = req.body.unit_price;
  const quantity = req.body.quantity;
  const total = req.body.total;
  const requestedby = req.body.requested_by;
  const lastupdatedate = new Date().toLocaleDateString();
  const lastupdateby = new Date().toLocaleTimeString();
  const creationdate = new Date().toLocaleDateString();

  console.log(requisition_id, product, unit_price, quantity, total);
  const sqlInsert =
    "INSERT INTO procurementsystem.purchaserequisitionlines (requisition_id,product, unit_price, quantity, total,last_update_date, last_updated_by, created_by,creation_date) VALUES (?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      requisition_id,
      product,
      unit_price,
      quantity,
      total,
      lastupdatedate,
      lastupdateby,
      requestedby,
      creationdate
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Requisition lines added successfully");
      }
    }
  );
});

app.post("/api/addusers", (req, res) => {
  const name = req.body.name;
  const empid = req.body.empid;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const mobile = req.body.mobile;
  var role = req.body.role;
  const lastupdatedby = req.body.lastupdatedby;
  const lastupdateddate = req.body.lastupdateddate;
  const createdby = req.body.createdby;
  const creationdate = req.body.creationdate;

  console.log(
    name,
    empid,
    email,
    password,
    address,
    role,
    lastupdatedby,
    lastupdateddate,
    createdby,
    creationdate
  );
  const sqlInsert =
    "INSERT INTO procurementsystem.users (Name,Employee_id, Email, Password, Address,Mobile,Role, Last_updated_by, Last_updated_date,created_by,creation_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      name,
      empid,
      email,
      password,
      address,
      mobile,
      role,
      lastupdatedby,
      lastupdateddate,
      createdby,
      creationdate
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("User Added Successfully");
      }
    }
  );
});

app.post("/api/addproduct", (req, res) => {
  const productname = req.body.productname;
  const price = req.body.price;
  const lastupdatedby = req.body.lastupdatedby;
  const lastupdateddate = req.body.lastupdateddate;
  const createdby = req.body.createdby;
  const creationdate = req.body.creationdate;

  console.log(
    productname,
    price,
    lastupdatedby,
    lastupdateddate,
    createdby,
    creationdate
  );
  const sqlInsert =
    "INSERT INTO procurementsystem.products (product_name,price,Last_update_date,Last_updated_by, created_by,creation_date) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      productname,
      price,
      lastupdateddate,
      lastupdatedby,
      createdby,
      creationdate
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Product Added Successfully");
      }
    }
  );
});

app.post("/api/createpurchaseorder", (req, res) => {
  const requisitionid = req.body.requisitionid;
  const requisitionnumber = req.body.requisitionnumber;
  const purchaseid = req.body.purchaseid;
  const requestedby = req.body.requestedby;
  const requesteddate = req.body.requesteddate;
  const expecteddate = req.body.expecteddate;
  const managername = req.body.managername;
  const vendorname = req.body.vendorname;
  const status = req.body.status;
  const lastupdatedate = req.body.lastupdatedate;
  const lastupdatedby = req.body.lastupdatedby;
  const createdby = req.body.createdby;
  const creationdate = req.body.creationdate;

  console.log(
    requisitionid,
    requisitionnumber,
    purchaseid,
    requestedby,
    requesteddate,
    expecteddate,
    managername,
    vendorname,
    status,
    lastupdatedate,
    lastupdatedby,
    createdby,
    creationdate
  );
  const sqlInsert =
    "INSERT INTO procurementsystem.purchaseorder (requisition_id,requisition_number,purchase_id,requested_by,requested_date, expected_date,managername,vendorname,status,last_update_date,last_updated_by,created_by,creation_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      requisitionid,
      requisitionnumber,
      purchaseid,
      requestedby,
      requesteddate,
      expecteddate,
      managername,
      vendorname,
      status,
      lastupdatedate,
      lastupdatedby,
      createdby,
      creationdate
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Purchase order created Successfully");
      }
    }
  );
});

app.put("/api/updateuser", (req, res) => {
  const name = req.body.name;
  const empid = req.body.empid;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const mobile = req.body.mobile;
  var role = req.body.role;
  const lastupdatedby = req.body.lastupdatedby;
  const lastupdateddate = req.body.lastupdateddate;
  const createdby = req.body.createdby;
  const creationdate = req.body.creationdate;

  console.log(
    name,
    empid,
    email,
    password,
    address,
    mobile,
    role,
    lastupdatedby,
    lastupdateddate,
    createdby,
    creationdate
  );
  const sqlInsert =
    "UPDATE procurementsystem.users SET Name=?,Employee_id=?,Email=?,Password=?,Address=?,Mobile=?,Role=?,Last_updated_by=?,Last_updated_date=?,created_by=?,creation_date=? WHERE Employee_id=?";
  db.query(
    sqlInsert,
    [
      name,
      empid,
      email,
      password,
      address,
      mobile,
      role,
      lastupdatedby,
      lastupdateddate,
      createdby,
      creationdate,
      empid
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("User Updated Successfully");
      }
    }
  );
});

app.put("/api/updateproduct", (req, res) => {
  const sno = req.body.sno;
  const productname = req.body.productname;
  const price = req.body.price;
  const lastupdatedby = req.body.lastupdatedby;
  const lastupdateddate = req.body.lastupdateddate;
  const createdby = req.body.createdby;
  const creationdate = req.body.creationdate;

  console.log(
    sno,
    productname,
    price,
    lastupdatedby,
    lastupdateddate,
    createdby,
    creationdate
  );
  const sqlInsert =
    "UPDATE procurementsystem.products SET SNO=?,product_name=?,price=?,Last_updated_by=?,last_update_date=?,created_by=?,creation_date=? WHERE product_name=?";
  db.query(
    sqlInsert,
    [
      sno,
      productname,
      price,
      lastupdatedby,
      lastupdateddate,
      createdby,
      creationdate,
      productname
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Product Updated Successfully");
      }
    }
  );
});

app.get("/api/getcreatepurchaserequisitions/", (req, res) => {
  const sqlSelect = "SELECT * FROM createpurchaserequisition order by id desc ";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    //console.log(result);
  });
});

app.get("/api/getpurchaseorder/", (req, res) => {
  const sqlSelect = "SELECT * FROM purchaseorder ";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    //console.log(result);
  });
});

app.get("/api/getallproducts/", (req, res) => {
  const sqlSelect = "SELECT * FROM procurementsystem.products";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    //console.log(result);
  });
});

app.get("/api/getapprovedpurchaserequisitions/", (req, res) => {
  var status = req.query.status;

  const sqlSelect = "SELECT * FROM createpurchaserequisition WHERE status=?";
  db.query(sqlSelect, [status], (err, result) => {
    res.send(result);
    //console.log(result);
  });
});

app.get(
  "/api/getapprovedpurchaserequisitionsforordergeneration/",
  (req, res) => {
    var requisitionnumber = req.query.requisitionnumber;
    console.log(requisitionnumber);
    const sqlSelect =
      "SELECT * FROM createpurchaserequisition WHERE requisition_number=?";
    db.query(sqlSelect, [requisitionnumber], (err, result) => {
      res.send(result);
      //console.log(result);
    });
  }
);

app.get("/api/getproductrequisitionlines/", (req, res) => {
  var product = req.query.product;
  var requisition_id = req.query.requisition_id;
  console.log(product);
  const sqlSelect =
    "SELECT * FROM purchaserequisitionlines WHERE requisition_id=? AND product=?";
  db.query(sqlSelect, [requisition_id, product], (err, result) => {
    res.send(result);
    //console.log(result);
  });
});

app.get("/api/getallusers/", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    //console.log(result);
  });
});

app.put("/api/updatepurchaserequisitionstatus", (req, res) => {
  var purchaserequisitionid = req.body.purchaserequisitionid;
  var status = "IN PROGRESS";
  console.log(purchaserequisitionid);
  const sqlSelect =
    "UPDATE procurementsystem.createpurchaserequisition SET status = ? WHERE requisition_id = ?";
  db.query(sqlSelect, [status, purchaserequisitionid], (err, result) => {
    res.send(result);
    //console.log(result);
  });
});

app.put("/api/updatemanagerpurchaserequisitionstatus", (req, res) => {
  var purchaserequisitionid = req.body.purchaserequisitionid;
  var status = req.body.status;
  var message = req.body.message;
  console.log(purchaserequisitionid, status, message);
  const sqlSelect =
    "UPDATE procurementsystem.createpurchaserequisition SET status = ?, message = ? WHERE requisition_id = ?";
  db.query(
    sqlSelect,
    [status, message, purchaserequisitionid],
    (err, result) => {
      res.send(result);
      //console.log(result);
    }
  );
});

app.get("/api/getpurchaserequisitionlines/", (req, res) => {
  var id = req.query.requisitionid;
  console.log(id);
  const sqlSelect =
    "SELECT * FROM purchaserequisitionlines WHERE requisition_id=?";
  db.query(sqlSelect, [id], (err, result) => {
    res.send(result);
    //console.log(result);
  });
});

app.get("/api/getproducts/", (req, res) => {
  const sqlSelect = "SELECT * FROM products";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    //console.log(result);
  });
});

app.delete(`/api/deleterequisitionlines/`, (req, res) => {
  const requisition_id = req.query.requisition_id;
  const product = req.query.product;
  console.log(requisition_id, product);
  const sqldelete =
    "DELETE FROM procurementsystem.purchaserequisitionlines WHERE requisition_id= ? AND product= ?";
  db.query(sqldelete, [requisition_id, product], (err, result) => {
    res.send("Requisition Lines Deleted Successfully");
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
