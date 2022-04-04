import EventHandlerInterface from '../../event-handler-interface';
import ProductCreated from '../product-created';

export default class SendEmailWhenProductCreatedHandler implements EventHandlerInterface<ProductCreated> {
  handle(event: ProductCreated): void {
    console.log(`Send email for product created event : ${event.eventData.name}`);
  }
} 