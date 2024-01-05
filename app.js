const express = require("express");
const path = require("path");
const homeRoutes = require("./routes/homeRoutes");
const sequelize = require("./util/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/", homeRoutes);

const Appointment = sequelize.define("appointments", {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: sequelize.Sequelize.STRING,
    allowNull: true,
  },
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables synchronized successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing tables:", error);
  });

app.get("/get-all-appointments", async (req, res) => {
  try {
    const allAppointments = await Appointment.findAll();
    res.json(allAppointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/save-appointment", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newAppointment = await Appointment.create({
      name,
      email,
      phone,
    });
    console.log("Appointment saved:", newAppointment);
    res.json(newAppointment);
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/delete-appointment/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    await Appointment.destroy({ where: { id: appointmentId } });
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
