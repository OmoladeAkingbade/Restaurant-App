import { array } from "joi";
import request from "supertest";
import app from "../app";

let token: string;
let recipeId: string;

// test authentication(signup and login)
describe("user authentication", () => {
  it("it should create an account for a user", async () => {
    const data = {
      email: "adaeze@gmail.com",
      password: "adapassword",
      fullname: "Eberechi Adaeze",
    };

    const response = await request(app).post("/api/v1/users/signup").send(data);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data.email).toBe(data.email);
    expect(response.body.data.fullname).toBe(data.fullname);
    expect(response.body).toHaveProperty("token");
  });

  //    login

  it("it should log the user into the application", async () => {
    const data = {
      email: "adaeze@gmail.com",
      password: "adapassword",
    };

    const response = await request(app).post("/api/v1/users/login").send(data);

    token = response.body.token;

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.email).toBe(data.email);
    expect(response.body).toHaveProperty("token");
  });
});

// test create recipe
describe("create recipe", () => {
  it("it should create a recipe fro logged in users", async () => {
    const recipe = {
      title: "Pizza",
      meal_type: "snack",
      difficulty_level: "intermediate",
      ingredients: [
        { name: "flour", price: 88 },
        { name: "water", price: 71 },
        { name: "chicken", price: 98 },
      ],
      preparation: "just pour everything",
    };

    const response = await request(app)
      .post("/api/v1/recipes")
      .send(recipe)
      .set("Authorization", `Bearer ${token}`);

    // console.log(response.body);
    // console.log(response.body);

    recipeId = response.body.message._id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toHaveProperty("title");
    expect(Array.isArray(response.body.message.ingredients)).toBe(true);
  });
});

// test get all recipes by one user

describe("get all recipes", () => {
  it("it should get all recipes created by a user", async () => {
    const response = await request(app)
      .get("/api/v1/recipes/user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("recipe");
    expect(Array.isArray(response.body.data.recipe)).toBe(true);
  });
});

describe("get one recipe", () => {
  it("it should get one recipe created by a user", async () => {
    const response = await request(app)
      .get(`/api/v1/recipes/${recipeId}`)
      .set("Authorization", `Bearer ${token}`);

    // console.log("response");
    // console.log(response);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("recipe");
    expect(Array.isArray(response.body.data.recipe.ingredients)).toBe(true);
  });
});

describe("update one recipe", () => {
  it("it should update one recipe created by a user", async () => {
    const data = {
      title: "small chops bologne",
    };
    const response = await request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set("Authorization", `Bearer ${token}`);

    // console.log(response);

    expect(response.status).toBe(201);
    expect(response.body.data.updatedRecipe).toHaveProperty("title");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("updatedRecipe");
    expect(Array.isArray(response.body.data.updatedRecipe.ingredients)).toBe(
      true
    );
  });
});

describe("delete recipe", () => {
  it("it should delete a recipe created by a user", async () => {
    const response = await request(app)
      .delete(`/api/v1/recipes/${recipeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);

    // expect(Array.isArray(response.body.data.updatedRecipe.ingredients)).toBe(true);
  });
});
