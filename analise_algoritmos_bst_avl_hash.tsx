import React, { useState, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, Search, Plus, Trash2, Shuffle, Play, Info } from 'lucide-react';

// BST Node
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// BST Implementation
class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    this.root = this._insertRec(this.root, value);
  }

  _insertRec(node, value) {
    if (!node) return new BSTNode(value);
    
    if (value < node.value) {
      node.left = this._insertRec(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertRec(node.right, value);
    }
    return node;
  }

  search(value) {
    return this._searchRec(this.root, value);
  }

  _searchRec(node, value) {
    if (!node || node.value === value) return node;
    
    if (value < node.value) {
      return this._searchRec(node.left, value);
    }
    return this._searchRec(node.right, value);
  }

  delete(value) {
    this.root = this._deleteRec(this.root, value);
  }

  _deleteRec(node, value) {
    if (!node) return node;

    if (value < node.value) {
      node.left = this._deleteRec(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteRec(node.right, value);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      node.value = this._minValue(node.right);
      node.right = this._deleteRec(node.right, node.value);
    }
    return node;
  }

  _minValue(node) {
    while (node.left) node = node.left;
    return node.value;
  }
}

// AVL Node
class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

// AVL Tree Implementation
class AVLTree {
  constructor() {
    this.root = null;
  }

  _getHeight(node) {
    return node ? node.height : 0;
  }

  _getBalance(node) {
    return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
  }

  _rotateRight(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;
    x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;

    return x;
  }

  _rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;
    y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;

    return y;
  }

  insert(value) {
    this.root = this._insertRec(this.root, value);
  }

  _insertRec(node, value) {
    if (!node) return new AVLNode(value);

    if (value < node.value) {
      node.left = this._insertRec(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertRec(node.right, value);
    } else {
      return node;
    }

    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

    const balance = this._getBalance(node);

    if (balance > 1 && value < node.left.value) {
      return this._rotateRight(node);
    }

    if (balance < -1 && value > node.right.value) {
      return this._rotateLeft(node);
    }

    if (balance > 1 && value > node.left.value) {
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }

    if (balance < -1 && value < node.right.value) {
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }

    return node;
  }

  search(value) {
    return this._searchRec(this.root, value);
  }

  _searchRec(node, value) {
    if (!node || node.value === value) return node;
    
    if (value < node.value) {
      return this._searchRec(node.left, value);
    }
    return this._searchRec(node.right, value);
  }

  delete(value) {
    this.root = this._deleteRec(this.root, value);
  }

  _deleteRec(node, value) {
    if (!node) return node;

    if (value < node.value) {
      node.left = this._deleteRec(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteRec(node.right, value);
    } else {
      if (!node.left || !node.right) {
        const temp = node.left || node.right;
        if (!temp) {
          node = null;
        } else {
          node = temp;
        }
      } else {
        const temp = this._minValue(node.right);
        node.value = temp.value;
        node.right = this._deleteRec(node.right, temp.value);
      }
    }

    if (!node) return node;

    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

    const balance = this._getBalance(node);

    if (balance > 1 && this._getBalance(node.left) >= 0) {
      return this._rotateRight(node);
    }

    if (balance > 1 && this._getBalance(node.left) < 0) {
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }

    if (balance < -1 && this._getBalance(node.right) <= 0) {
      return this._rotateLeft(node);
    }

    if (balance < -1 && this._getBalance(node.right) > 0) {
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }

    return node;
  }

  _minValue(node) {
    while (node.left) node = node.left;
    return node;
  }
}

// Hash Table Implementation
class HashTable {
  constructor(size = 1000) {
    this.size = size;
    this.buckets = new Array(size).fill(null).map(() => []);
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.size;
    }
    return hash;
  }

  insert(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    
    if (!bucket.includes(key)) {
      bucket.push(key);
    }
  }

  search(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    return bucket.includes(key);
  }

  delete(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    const keyIndex = bucket.indexOf(key);
    
    if (keyIndex !== -1) {
      bucket.splice(keyIndex, 1);
    }
  }
}

function BenchmarkApp() {
  const [names, setNames] = useState([]);
  const [inputName, setInputName] = useState('');
  const [benchmarkData, setBenchmarkData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState('insert');
  
  const bstRef = useRef(new BST());
  const avlRef = useRef(new AVLTree());
  const hashRef = useRef(new HashTable());

  const sampleNames = [
    'Ana', 'Bruno', 'Carlos', 'Diana', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Igor', 'Julia',
    'Kaio', 'Larissa', 'Marcos', 'Natalia', 'Otavio', 'Paula', 'Rafael', 'Sofia', 'Thiago', 'Vanessa',
    'William', 'Ximena', 'Yago', 'Zara', 'Alice', 'Benjamin', 'Camila', 'Diego', 'Elisa', 'Felipe',
    'Giovana', 'Henrique', 'Isabel', 'João', 'Karina', 'Lucas', 'Mariana', 'Nicolas', 'Olivia', 'Pedro'
  ];

  const generateRandomNames = (count) => {
    const randomNames = [];
    for (let i = 0; i < count; i++) {
      const baseName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
      randomNames.push(`${baseName}${i + 1}`);
    }
    return randomNames;
  };

  const addName = () => {
    if (inputName.trim() && !names.includes(inputName.trim())) {
      setNames([...names, inputName.trim()]);
      setInputName('');
    }
  };

  const generateNames = (count) => {
    const newNames = generateRandomNames(count);
    setNames(newNames);
    addLog(`✨ Gerados ${count} nomes aleatórios`, 'info');
  };

  const measureTime = (fn) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    return (end - start).toFixed(3);
  };

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-9), { message, type, timestamp }]);
  };

  const runBenchmark = async (operation) => {
    if (names.length === 0) {
      addLog('❌ Adicione nomes primeiro!', 'error');
      return;
    }

    setIsRunning(true);
    const results = { operation, BST: 0, AVL: 0, HashTable: 0 };

    // Reset structures for fair comparison
    bstRef.current = new BST();
    avlRef.current = new AVLTree();
    hashRef.current = new HashTable();

    // Insert all names first if operation is not insert
    if (operation !== 'insert') {
      names.forEach(name => {
        bstRef.current.insert(name);
        avlRef.current.insert(name);
        hashRef.current.insert(name);
      });
    }

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));

    if (operation === 'insert') {
      // Measure insertion time
      results.BST = measureTime(() => {
        names.forEach(name => bstRef.current.insert(name));
      });

      results.AVL = measureTime(() => {
        names.forEach(name => avlRef.current.insert(name));
      });

      results.HashTable = measureTime(() => {
        names.forEach(name => hashRef.current.insert(name));
      });

      addLog(`📊 Inserção de ${names.length} nomes - BST: ${results.BST}ms | AVL: ${results.AVL}ms | Hash: ${results.HashTable}ms`, 'success');
    
    } else if (operation === 'search') {
      // Search for random names
      const searchNames = names.slice(0, Math.min(100, names.length));
      
      results.BST = measureTime(() => {
        searchNames.forEach(name => bstRef.current.search(name));
      });

      results.AVL = measureTime(() => {
        searchNames.forEach(name => avlRef.current.search(name));
      });

      results.HashTable = measureTime(() => {
        searchNames.forEach(name => hashRef.current.search(name));
      });

      addLog(`🔍 Busca de ${searchNames.length} nomes - BST: ${results.BST}ms | AVL: ${results.AVL}ms | Hash: ${results.HashTable}ms`, 'success');
    
    } else if (operation === 'delete') {
      // Delete random names
      const deleteNames = names.slice(0, Math.min(50, names.length));
      
      results.BST = measureTime(() => {
        deleteNames.forEach(name => bstRef.current.delete(name));
      });

      results.AVL = measureTime(() => {
        deleteNames.forEach(name => avlRef.current.delete(name));
      });

      results.HashTable = measureTime(() => {
        deleteNames.forEach(name => hashRef.current.delete(name));
      });

      addLog(`🗑️ Remoção de ${deleteNames.length} nomes - BST: ${results.BST}ms | AVL: ${results.AVL}ms | Hash: ${results.HashTable}ms`, 'success');
    }

    setBenchmarkData(prev => [...prev.slice(-4), results]);
    setIsRunning(false);
  };

  const clearData = () => {
    setNames([]);
    setBenchmarkData([]);
    setLogs([]);
    bstRef.current = new BST();
    avlRef.current = new AVLTree();
    hashRef.current = new HashTable();
    addLog('🧹 Dados limpos', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏆 Benchmark Visual de Estruturas de Dados
          </h1>
          <p className="text-gray-600 text-lg">
            Compare o desempenho de BST, AVL e Hash Table com operações em nomes
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Plus className="mr-2" size={20} />
                Entrada de Dados
              </h3>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addName()}
                  placeholder="Digite um nome..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addName}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Adicionar
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => generateNames(100)}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors flex items-center"
                >
                  <Shuffle className="mr-1" size={14} />
                  100 nomes
                </button>
                <button
                  onClick={() => generateNames(1000)}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors flex items-center"
                >
                  <Shuffle className="mr-1" size={14} />
                  1.000 nomes
                </button>
                <button
                  onClick={() => generateNames(5000)}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors flex items-center"
                >
                  <Shuffle className="mr-1" size={14} />
                  5.000 nomes
                </button>
                <button
                  onClick={clearData}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors flex items-center"
                >
                  <Trash2 className="mr-1" size={14} />
                  Limpar
                </button>
              </div>

              <div className="text-sm text-gray-600">
                📝 {names.length} nomes carregados
              </div>
            </div>

            {/* Operations Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Play className="mr-2" size={20} />
                Operações de Benchmark
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => runBenchmark('insert')}
                  disabled={isRunning || names.length === 0}
                  className="w-full px-4 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Plus className="mr-2" size={18} />
                  {isRunning ? 'Testando...' : 'Benchmark Inserção'}
                </button>

                <button
                  onClick={() => runBenchmark('search')}
                  disabled={isRunning || names.length === 0}
                  className="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Search className="mr-2" size={18} />
                  {isRunning ? 'Testando...' : 'Benchmark Busca'}
                </button>

                <button
                  onClick={() => runBenchmark('delete')}
                  disabled={isRunning || names.length === 0}
                  className="w-full px-4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Trash2 className="mr-2" size={18} />
                  {isRunning ? 'Testando...' : 'Benchmark Remoção'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="mr-2" size={20} />
              Comparação de Performance (ms)
            </h3>
            
            {benchmarkData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={benchmarkData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="operation" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} ms`, 'Tempo']} />
                  <Legend />
                  <Bar dataKey="BST" fill="#8884d8" name="BST" />
                  <Bar dataKey="AVL" fill="#82ca9d" name="AVL" />
                  <Bar dataKey="HashTable" fill="#ffc658" name="Hash Table" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Execute um benchmark para ver os resultados
              </div>
            )}
          </div>

          {/* Logs */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Info className="mr-2" size={20} />
              Log de Operações
            </h3>
            
            <div className="h-64 overflow-y-auto space-y-2">
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <div key={index} className={`p-2 rounded text-sm ${
                    log.type === 'error' ? 'bg-red-100 text-red-700' :
                    log.type === 'success' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    <span className="text-xs text-gray-500 mr-2">{log.timestamp}</span>
                    {log.message}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center">
                  Os logs das operações aparecerão aqui
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational Info */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">🎓 Complexidades Teóricas</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-2">BST (Binary Search Tree)</h4>
              <ul className="space-y-1 text-purple-600">
                <li>• Busca: O(log n) - O(n)</li>
                <li>• Inserção: O(log n) - O(n)</li>
                <li>• Remoção: O(log n) - O(n)</li>
                <li className="text-xs text-purple-500">*Pior caso: árvore desbalanceada</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">AVL Tree</h4>
              <ul className="space-y-1 text-green-600">
                <li>• Busca: O(log n)</li>
                <li>• Inserção: O(log n)</li>
                <li>• Remoção: O(log n)</li>
                <li className="text-xs text-green-500">*Auto-balanceada</li>
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-700 mb-2">Hash Table</h4>
              <ul className="space-y-1 text-yellow-600">
                <li>• Busca: O(1) - O(n)</li>
                <li>• Inserção: O(1) - O(n)</li>
                <li>• Remoção: O(1) - O(n)</li>
                <li className="text-xs text-yellow-500">*Depende de colisões</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BenchmarkApp;