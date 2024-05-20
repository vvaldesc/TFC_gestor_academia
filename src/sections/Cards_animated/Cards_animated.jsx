import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from 'react';

import Button_basic_framer from "../../components/buttons/Button_basic_framer/Button_basic_framer";

export default function Cards_animated() {
  const [selectedId, setSelectedId] = useState(null)

  const items = [
    { id: 1, title: 'First item', subtitle: 'Subtitle 1' },
    { id: 2, title: 'Second item', subtitle: 'Subtitle 2' },
    { id: 3, title: 'Third item', subtitle: 'Subtitle 3' }
  ]
  return (
    <>
      {items.map((item) => (
        <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
          <div className="w-36 h-36 bg-black">
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
          </div>
        </motion.div>
      ))}
      
      <AnimatePresence>
        {selectedId && (
          items.map((item) => (
            <motion.div layoutId={selectedId}>
              <motion.h5>{item.subtitle}</motion.h5>
              <motion.h2>{item.title}</motion.h2>
              <motion.button onClick={() => setSelectedId(null)} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </>
  );
}