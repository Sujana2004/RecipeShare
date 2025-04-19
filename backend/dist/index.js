"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny', { stream: fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' }) }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 3600000, sameSite: 'lax' }
}));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use('/uploads', express_1.default.static('uploads'));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/recipes', recipeRoutes_1.default);
// app.use(bodyParser.json());
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
app.get('/', (req, res) => {
    res.send('API is running...');
});
mongoose_1.default.connect(process.env.MONGO_URI || '')
    .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch(err => console.error('Mongo Error:', err));
