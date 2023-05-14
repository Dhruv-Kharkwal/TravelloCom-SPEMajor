import assert from "assert";
import request from "supertest";
import app from "../index.js"; // assuming your Express.js app is exported from app.js

describe("Login API Tests", function () {
  let token;
  let id; // Declare a variable to store the token

  it("should return a valid token and user data for successful login", function (done) {
    const credentials = {
      email: "testuser@gmail.com",
      password: "testuser",
    };

    const expectedUserData = {
      __v: 3,
      _id: "645e9b130a02bb49e2bdd9c4",
      createdAt: "2023-05-12T20:01:23.915Z",
      email: "testuser@gmail.com",
      firstName: "test",
      friends: ["645e9b8e0a02bb49e2bdd9cd"],
      lastName: "user",
      location: "Ecity",
      occupation: "student",
      password: "$2b$10$/UbJwYH/AjGDikFX3UnsI.vz1kGl2o/um7XL3vugiGuLmbgxhsluy",
      picturePath: "testUser.jpeg",
      updatedAt: "2023-05-14T12:35:10.329Z",
    };

    request(app)
      .post("/auth/login")
      .send(credentials)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
          return;
        }

        assert.strictEqual(res.status, 200);
        assert.ok(res.body.token);
        assert.ok(res.body.user); // Assuming userData is returned along with the token
        assert.deepEqual(res.body.user, expectedUserData);
        // Store the token for subsequent requests
        token = res.body.token;
        id = res.body.user._id;
        console.log(id);

        done();
      });
  });

  it("should return user data with valid token", function (done) {
    const credentials = {
      email: "testuser@gmail.com",
      password: "testuser1",
    };

    const expectedData = {
      msg: "Invalid credentials. ",
    };

    request(app)
      .post("/auth/login")
      .send(credentials)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          done(err);
          return;
        }

        assert.strictEqual(res.status, 400);
        assert.deepEqual(res.body, expectedData);
        // Assuming the user data is returned as the response body
        done();
      });
  });
});
