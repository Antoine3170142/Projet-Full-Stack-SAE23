const Ticket = require('../models/ticket');
const fs = require('fs');

exports.createTicket = (req, res, next) => {
  const ticketObject = JSON.parse(req.body.ticket);
  delete ticketObject._id;
  delete ticketObject._userId;
  const ticket = new Ticket({
      ...ticketObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  ticket.save()
  .then(() => { res.status(201).json({message: 'Ticket enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

exports.getOneTicket = (req, res, next) => {
    Ticket.findOne({ _id: req.params.id })
      .then(ticket => res.status(200).json(ticket))
      .catch(error => res.status(404).json({ error }));
};

exports.modifyTicket = (req, res, next) => {
  const ticketObject = req.file ? 
  {
    ...JSON.parse(req.body.ticket),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
      Ticket.updateOne({_id: req.params.id}, ticketObject)
      .then(() => {res.status(201).json({message: 'Ticket updated successfully!'});})
      .catch((error) => {res.status(400).json({error: error});});
};

exports.deleteTicket = (req, res, next) => {
  Ticket.findOne({ _id: req.params.id})
  .then(ticket => {
      if (ticket.userId != req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
          const filename = ticket.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Ticket.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Ticket supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
};


exports.getAllTicket = (req, res, next) => {
    Ticket.find()
      .then(ticket => res.status(200).json(ticket ))
      .catch(error => res.status(400).json({ error }));
};
