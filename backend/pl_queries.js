const pool = require("./postgresql_connection.js").pool;
const validate = require("./validate.js");

const getPD = (request, response) => {
  pool.query(
    "SELECT * FROM fms_parking_lot ORDER BY pd_lot_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getPDById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM fms_parking_lot WHERE pd_lot_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getPDByname = (request, response) => {
  const name = request.params.name;

  pool.query(
    "SELECT * FROM fms_parking_lot WHERE pd_loc_name = $1",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getPDByOwner = (request, response) => {
  const id = request.params.owner_id;
  pool.query(
    "SELECT * FROM fms_parking_lot where pd_owner_id =$1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
// const createUser = (request, response) => {
//   const { id,email,fname,lname, mobile } = request.body

//   pool.query('INSERT INTO fms_user (user_user_id,user_email_id,user_first_name,user_last_name, user_mobile_no) VALUES($1, $2,$3,$4,$5)', [ id,email,fname,lname, mobile], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`User addressed with ID: ${result.insertId}`)
//   })
// }

const createPD = (request, response) => {
  console.log(request.body);
  const {
    name,
    address,
    pin,
    longitude,
    latitude,
    price,
    total,
  } = request.body;
  const owner_id =request.params.owner_id

  const temp = validate.create_pd_schema.validate({
    jid: owner_id,
    jname: name,
    jprice: price,
    jlon: longitude,
    jlat: latitude,
    jadd: address,
    jpin: pin,
    jtotal: total,
  });
  //console.log(temp.error)
  if (temp.error) {
    console.log(temp.error);
    response.status(400).send("Invalid Data");
  } else {
    //for inserting user
    const text =
      "INSERT INTO fms_parking_lot (pd_loc_name,pd_loc_address,pd_loc_pincode,longitude,latitude,pd_hrly_rate,pd_owner_id,total_spot) VALUES($1, $2,$3,$4,$5,$6,$7,$8)";
    const values = [
      name,
      address,
      pin,
      longitude,
      latitude,
      price,
      owner_id,
      total,
    ];
    pool.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack);
        response.status(400).json("error");
      } else {
        console.log("Parking Lot Added...");
        //for getting details of user
        const pl_id =
          "SELECT pd_lot_id from fms_parking_lot WHERE pd_loc_name = $1 AND pd_owner_id=$2";
        pool.query(pl_id, [name, owner_id], (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let lot_id = Number(res.rows[0]["pd_lot_id"]);
            for (let index = 1; index <= total; index++) {
              var text =
                "INSERT INTO fms_parking_spot (spot_no,sd_status,lot_id) VALUES($1, $2,$3)";
              var values = [index, 0, lot_id];

              pool.query(text, values, (err, res) => {
                if (err) {
                  console.log(err.stack);
                } else {
                  //console.log(res.rows[0])
                  //response.status(201).send(`Spots added `)
                  // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
                }
              });
            }
            console.log(res.rows);
            userDetail = res.rows[0];
            //delete user["user_mobile_no"];
            delete userDetail["user_password"];
            response.status(201).json(userDetail);
          }
        });
      }
    });
  }
  //else {
  //   const text =
  //     "INSERT INTO fms_parking_lot (pd_loc_name,pd_loc_address,pd_loc_pincode,longitude,latitude,pd_hrly_rate,pd_owner_id,total_spot) VALUES($1, $2,$3,$4,$5,$6,$7,$8)";
  //   const values = [
  //     name,
  //     address,
  //     pin,
  //     longitude,
  //     latitude,
  //     price,
  //     owner_id,
  //     total,
  //   ];
  //   // callback
  //   pool.query(text, values, (err, res) => {
  //     if (err) {
  //       console.log(err.stack);
  //       response.status(400).json({
  //         ...{ error_message: "Parking Lot already exists...." },
  //       });
  //     } else {
  //       console.log(res.rows[0]);
  //       response.status(201).send(`Parking Lot Registered...`);
  //       // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }

  //     }
  //   });
  // }
};

//total is remaining

const updatePD = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, price } = request.body;

  const temp = validate.update_pd_schema.validate({
    jid: id,
    jname: name,
    jprice: price,
  });
  //console.log(temp.error)
  if (temp.error) {
    response
      .status(400)
      .send("Parking was not updated. Invalid entry. Please try again.");
  } else {
    pool.query(
      "UPDATE fms_parking_lot SET pd_loc_name = $2, pd_hrly_rate = $3 WHERE pd_lot_id = $1",
      [id, name, price],
      (error, result) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`Parking Lot modified with ID: ${id}`);
      }
    );
  }
};

const deletePD = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM fms_parking_lot WHERE pd_lot_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Parking deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getPD,
  getPDById,
  getPDByname,
  getPDByOwner,
  createPD,
  updatePD,
  deletePD,
};
