import assert from "assert";
import request from "supertest";
import app from "../index.js"; // assuming your Express.js app is exported from app.js

// describe("API Tests", function () {
//   it("should return the correct response for POST /auth/login", function (done) {
//     const expectedUserData = {
//       user: {
//         _id: "645ddd750207d3e2f3e2fcf4",
//         firstName: "dhruv",
//         lastName: "kharkwal",
//         email: "dhruv@gmail.com",
//         password:
//           "$2b$10$Me4KP0hJAAhvqvWilABWiOXOjuCSmzjqTL6sJlJu4wMo1TFLZ0lyS",
//         picturePath: "person.jpeg",
//         friends: ["645dde140207d3e2f3e2fd03"],
//         location: "Ecity",
//         occupation: "student",
//         createdAt: "2023-05-12T06:32:21.097Z",
//         updatedAt: "2023-05-12T16:45:39.546Z",
//         __v: 40,
//       },
//     };

//     const credentials = {
//       email: "dhruv@gmail.com",
//       password: "dhruv",
//     };

//     request(app)
//       .post("/auth/login")
//       .send(credentials)
//       .expect(200)
//       .end(function (err, res) {
//         assert.equal(res.body, expectedUserData);
//         done(err);
//       });
//   });
// });

describe("Login API Tests", function () {
  let token; // Declare a variable to store the token

  it("should return a valid token and user data for successful login", function (done) {
    const credentials = {
      email: "dhruv@gmail.com",
      password: "dhruv",
    };

    const expectedUserData = {
      _id: "645ddd750207d3e2f3e2fcf4",
      firstName: "dhruv",
      lastName: "kharkwal",
      email: "dhruv@gmail.com",
      password: "$2b$10$Me4KP0hJAAhvqvWilABWiOXOjuCSmzjqTL6sJlJu4wMo1TFLZ0lyS",
      picturePath: "person.jpeg",
      friends: ["645dde140207d3e2f3e2fd03"],
      location: "Ecity",
      occupation: "student",
      createdAt: "2023-05-12T06:32:21.097Z",
      updatedAt: "2023-05-12T16:45:39.546Z",
      __v: 40,
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

        done();
      });
  });

  // it('should return user data with valid token', function(done) {
  //   request(app)
  //     .get('/api/users')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200)
  //     .end(function(err, res) {
  //       if (err) {
  //         done(err);
  //         return;
  //       }

  //       assert.deepStrictEqual(res.body, res.body.userData); // Assuming the user data is returned as the response body
  //       done();
  //     });
  // });
});
