import { app } from "./app";
import { EOL } from "os";
import { Server } from 'http';

const PORT = 3000;

// app.listen(3000, () => {
//   console.log("🚂 Express server started on port 3000");
// });

try {

const server = app
		.listen(PORT, () => {
			
			console.log(
				`⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐`
			);
      console.log(
        `⭐    Server is now listening on port: ⚓ ${PORT}                  ⭐`
      );
			console.log(
				`⭐    Health check at "http://localhost:${PORT}/health"            ⭐`
			);
			console.log(
				`⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐`
			);
		})
		.on('error', (error) => {
			console.error('🚨 Express Error Handler 🚨 ');
			console.error(error);
		});

	process.on('SIGINT', () => handleShutdown(server));
	process.on('SIGTERM', () => handleShutdown(server));
	process.on('SIGHUP', () => handleShutdown(server));
} catch (e: unknown) {
	console.error('🚨 Top level Error caught 🚨 ');
	console.error((e as Error).message);
}

function handleShutdown(server: Server) {
	console.log('🚪 Closing Server...');
	server.close(() => {
		console.log('🏥 Express server closed ✅');
		process.exit(0);
	});
}
