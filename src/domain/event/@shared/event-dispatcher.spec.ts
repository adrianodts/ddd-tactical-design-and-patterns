import Product from '../../entity/product';
import SendEmailWhenProductCreatedHandler from '../product/handler/send-email-when-product-created-handler';
import ProductCreated from '../product/product-created';
import EventDispatcher from './event-dispatcher';
import EventHandlerInterface from './event-handler-interface';
import EventInterface from './event-interface';



describe("domain events tests", () => {

  it('should be able to register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    eventDispatcher.register('ProductCreated', eventHandler);
    expect(eventDispatcher.eventHandlers['ProductCreated']).toBeDefined();
    expect(eventDispatcher.eventHandlers['ProductCreated'].length).toBe(1);
    expect(eventDispatcher.eventHandlers['ProductCreated'][0]).toMatchObject(eventHandler);
  });

  it('should be able to unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    eventDispatcher.register('ProductCreated', eventHandler);
    expect(eventDispatcher.eventHandlers['ProductCreated']).toBeDefined();
    expect(eventDispatcher.eventHandlers['ProductCreated'].length).toBe(1);
    expect(eventDispatcher.eventHandlers['ProductCreated'][0]).toMatchObject(eventHandler);
    eventDispatcher.unregister('ProductCreated', eventHandler);
    expect(eventDispatcher.eventHandlers['ProductCreated']).toBeDefined();
    expect(eventDispatcher.eventHandlers['ProductCreated'].length).toBe(0);
  });

  it('should be able to unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    eventDispatcher.register('ProductCreated', eventHandler);
    expect(eventDispatcher.eventHandlers['ProductCreated']).toBeDefined();
    expect(eventDispatcher.eventHandlers['ProductCreated'].length).toBe(1);
    expect(eventDispatcher.eventHandlers['ProductCreated'][0]).toMatchObject(eventHandler);
    eventDispatcher.unregisterAll();
    expect(eventDispatcher.eventHandlers['ProductCreated']).toBeUndefined();
  });

  it('should be able to notify an event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');
    eventDispatcher.register('ProductCreated', eventHandler);
    expect(eventDispatcher.eventHandlers['ProductCreated']).toBeDefined();
    expect(eventDispatcher.eventHandlers['ProductCreated'].length).toBe(1);
    expect(eventDispatcher.eventHandlers['ProductCreated'][0]).toMatchObject(eventHandler);    
    const productCreated = new ProductCreated({
      name: "Product 1", 
      description: "Product 1 description", 
      price: 10.0
    });
    eventDispatcher.notify(productCreated);    
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});