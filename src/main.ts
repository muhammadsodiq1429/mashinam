import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function start() {
  const PORT = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ["debug", "error", "warn"],
  });
  app.enableCors();
  app.setGlobalPrefix("/api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Mashinam Docs")
    .setDescription(
      "Bu yerda siz Mashinam endpointlarini sinab ko‘rishingiz mumkin"
    )
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api/docs`);
  });
}
start();
